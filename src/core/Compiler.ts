import { SymbolConfig } from "../middleware/common/CommonConfig";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { ProxyNotice } from "./ProxyBroadcast";
import { Processor2 } from "./Processor";
export interface CompilerTarget<C extends SymbolConfig> {
  [key: string]: C;
}

export abstract class Compiler<
  C extends SymbolConfig,
  T extends CompilerTarget<C>,
  O extends object
> {
  static processors = new Map<
    CONFIGTYPE | string,
    Processor2<SymbolConfig, object>
  >();

  static processor = function <C extends SymbolConfig, T extends object>(
    processor: Processor2<C, T>
  ) {
    Compiler.processors.set(
      processor.configType,
      <Processor2<SymbolConfig, object>>(<unknown>processor)
    );
  };

  abstract MODULE: MODULETYPE;
  target: T = {} as T;
  map: Map<SymbolConfig["vid"], O> = new Map();
  weakMap: WeakMap<O, SymbolConfig["vid"]> = new WeakMap();
  engine!: EngineSupport;

  constructor() {}

  useEngine(engine: EngineSupport): this {
    this.engine = engine;
    return this;
  }

  setTarget(target: T): this {
    this.target = target;
    return this;
  }

  add(config: C): O | null {
    if (!Compiler.processors.has(config.type)) {
      console.warn(`PassCompiler can not support this type: ${config.type}`);
      return null;
    }

    const processor = Compiler.processors.get(
      config.type
    )! as unknown as Processor2<C, O>;

    const pass = processor.create(config, this.engine);
    this.map.set(config.vid, pass);
    this.weakMap.set(pass, config.vid);
    return pass;
  }

  remove(config: C): this {
    const vid = config.vid;

    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid pass: ${vid}.`
      );
      return this;
    }

    if (!Compiler.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return this;
    }

    const pass = this.map.get(vid)!;
    Compiler.processors.get(config.type)!.dispose(pass);
    this.map.delete(vid);
    this.weakMap.delete(pass);
    return this;
  }

  cover(config: C): this {
    return this;
  }

  compile(vid: SymbolConfig["vid"], notice: ProxyNotice): this {
    if (!this.map.has(vid)) {
      console.warn(
        `pass compiler set function: can not found object which vid is: '${vid}'`
      );
      return this;
    }

    if (!this.target[vid]) {
      console.warn(
        `pass compiler set function: can not found config which vid is: '${vid}'`
      );
      return this;
    }

    const pass = this.map.get(vid)!;
    const config = this.target[vid]!;

    if (!Compiler.processors.has(config.type)) {
      console.warn(`PassCompiler can not support this type: ${config.type}`);
      return this;
    }

    const processor = Compiler.processors.get(
      config.type
    )! as unknown as Processor2<C, O>;

    processor.process({
      config,
      target: pass,
      engine: this.engine,
      ...notice,
    });
    return this;
  }

  compileAll(): this {
    const target = this.target;
    for (const config of Object.values(target)) {
      this.add(config);
    }
    return this;
  }

  dispose(): this {
    for (const config of Object.values(this.target)) {
      if (!this.map.has(config.vid)) {
        console.warn(
          `${this.MODULE} compiler set function: can not found object which vid is: '${config.vid}'`
        );
        continue;
      }

      const pass = this.map.get(config.vid)!;

      if (!Compiler.processors.has(config.type)) {
        console.warn(
          `${this.MODULE}  can not support this type: ${config.type}`
        );
        continue;
      }

      Compiler.processors.get(config.type)!.dispose(pass);
    }

    this.map.clear();
    this.target = {} as T;
    return this;
  }

  getObjectSymbol(object: O): string | null {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid: string): O | null {
    return this.map.get(vid) || null;
  }
}
