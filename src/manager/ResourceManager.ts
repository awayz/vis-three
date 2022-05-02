import { BaseEvent, Mesh, Object3D, Vector3 } from "three";
import { generateConfig } from "../convenient/generateConfig";
import { EventDispatcher } from "../core/EventDispatcher";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { LoadOptions } from "./DataSupportManager";
import { GroupConfig } from "../middleware/group/GroupConfig";
import * as JSONHandler from "../convenient/JSONHandler";
import { MeshConfig } from "../middleware/mesh/MeshConfig";
import { CONFIGMODULE } from "../middleware/constants/CONFIGMODULE";

export interface ObjectMappingStructure {
  type: string;
  url: string;
  geometry?: string;
  material?: string | string[];
  children?: ObjectMappingStructure[];
}

export interface MappedEvent extends BaseEvent {
  structureMap: Map<string, unknown>;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, unknown>;
  resourceConfig: { [key: string]: LoadOptions };
}

export enum RESOURCEEVENTTYPE {
  MAPPED = "mapped",
}

export class ResourceManager extends EventDispatcher {
  structureMap: Map<string, unknown> = new Map(); // 外部资源结构映射 url -> structure mappingUrl
  configMap: Map<string, SymbolConfig> = new Map(); // 配置映射 mappingUrl -> config
  resourceMap: Map<string, unknown> = new Map(); // 资源映射 mappingUrl -> resource

  private configModuleMap = CONFIGMODULE;
  private mappingHandler = new Map();

  constructor() {
    super();
    const mappingHandler = this.mappingHandler;

    mappingHandler.set(HTMLImageElement, this.HTMLImageElementHandler);
    mappingHandler.set(HTMLCanvasElement, this.HTMLCanvasElementHanlder);
    mappingHandler.set(HTMLVideoElement, this.HTMLVideoElementHander);
    mappingHandler.set(Object3D, this.Object3DHandler);
  }

  private Object3DHandler(url: string, object: Object3D): this {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;

    // 递归映射物体
    const recursionMappingObject = function (
      url: string,
      object: Object3D
    ): ObjectMappingStructure {
      let mappingUrl = url;

      resourceMap.set(mappingUrl, object);
      const objectConfig = generateConfig(
        object.type,
        object,
        true,
        false
      )! as MeshConfig;
      configMap.set(mappingUrl, objectConfig);

      const config: ObjectMappingStructure = {
        type: `${object.type}`,
        url: mappingUrl,
      };
      // 映射几何配置
      if ((object as Mesh).geometry) {
        const geometry = (object as Mesh).geometry;
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = box.getCenter(new Vector3());
        mappingUrl = `${url}.geometry`;
        // 存资源
        resourceMap.set(mappingUrl, geometry);
        // 生成配置单
        const geometryConfig = generateConfig(CONFIGTYPE.LOADGEOMETRY, {
          url: mappingUrl,
          position: {
            x: (center.x / (box.max.x - box.min.x)) * 2,
            y: (center.y / (box.max.y - box.min.y)) * 2,
            z: (center.z / (box.max.z - box.min.z)) * 2,
          },
        })!;
        configMap.set(mappingUrl, geometryConfig);
        // 载入结构
        config.geometry = mappingUrl;
        objectConfig.geometry = geometryConfig.vid;
      }

      // 映射材质配置 TODO: 映射贴图配置
      if ((object as Mesh).material) {
        const material = (object as Mesh).material;

        if (material instanceof Array) {
          config.material = [] as string[];
          objectConfig.material = [];
          material.forEach((materialChild, i, arr) => {
            mappingUrl = `${url}.material.${i}`;
            // 存资源
            resourceMap.set(mappingUrl, materialChild);
            // 生成配置单
            const materialConfig = generateConfig(
              materialChild.type,
              materialChild,
              true,
              false
            )!;
            configMap.set(mappingUrl, materialConfig);
            // 载入结构
            (config.material as string[])[i] = mappingUrl;
            (objectConfig.material as string[]).push(materialConfig.vid);
          });
        } else {
          mappingUrl = `${url}.material`;
          // 存资源
          resourceMap.set(mappingUrl, material);
          // 生成配置单
          const materialConfig = generateConfig(
            material.type,
            material,
            true,
            false
          )!;
          configMap.set(mappingUrl, materialConfig);
          // 载入结构
          (config.material as string) = mappingUrl;
          (objectConfig.material as string) = materialConfig.vid;
        }
      }

      // 映射子项配置
      // group特殊处理
      if (
        [CONFIGTYPE.GROUP, CONFIGTYPE.SCENE].includes(object.type as CONFIGTYPE)
      ) {
        (configMap.get(config.url) as GroupConfig).children = [];
      }

      if (object.children.length) {
        config.children = [];
        if (
          [CONFIGTYPE.GROUP, CONFIGTYPE.SCENE].includes(
            object.type as CONFIGTYPE
          )
        ) {
          const group = configMap.get(config.url) as GroupConfig;
          object.children.forEach((child, i, arr) => {
            mappingUrl = `${url}.children.${i}`;
            group.children.push(mappingUrl);
            config.children![i] = recursionMappingObject(mappingUrl, child);
          });
        } else {
          object.children.forEach((child, i, arr) => {
            mappingUrl = `${url}.children.${i}`;
            config.children![i] = recursionMappingObject(mappingUrl, child);
          });
        }
      }

      return config;
    };

    structureMap.set(url, recursionMappingObject(url, object));
    return this;
  }

  private HTMLImageElementHandler(
    url: string,
    element: HTMLImageElement
  ): this {
    this.resourceMap.set(url, element);
    this.configMap.set(
      url,
      generateConfig(CONFIGTYPE.IMAGETEXTURE, {
        url: url,
      })!
    );
    this.structureMap.set(url, url);
    return this;
  }

  private HTMLCanvasElementHanlder(
    url: string,
    element: HTMLCanvasElement
  ): this {
    this.resourceMap.set(url, element);
    this.configMap.set(
      url,
      generateConfig(CONFIGTYPE.CANVASTEXTURE, {
        url: url,
      })!
    );
    this.structureMap.set(url, url);
    return this;
  }

  private HTMLVideoElementHander(url: string, element: HTMLVideoElement): this {
    this.resourceMap.set(url, element);
    this.configMap.set(
      url,
      generateConfig(CONFIGTYPE.VIDEOTEXTURE, {
        url: url,
      })!
    );
    this.structureMap.set(url, url);
    return this;
  }

  /**
   *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
   * @param loadResourceMap loaderManager的resourceMap
   * @returns this
   */
  mappingResource(loadResourceMap: Map<string, unknown>): this {
    const structureMap = this.structureMap;
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;

    const mappingHandler = this.mappingHandler;

    const resourceHanlder = (
      url: string,
      object: object,
      prototype: object
    ): boolean => {
      if (!Object.getPrototypeOf(prototype)) {
        return false;
      } else if (
        mappingHandler.has(Object.getPrototypeOf(prototype).constructor)
      ) {
        mappingHandler
          .get(Object.getPrototypeOf(prototype).constructor)
          .call(this, url, object);
        return true;
      } else {
        return resourceHanlder(url, object, Object.getPrototypeOf(prototype));
      }
    };

    const resourceConfig: { [key: string]: LoadOptions } = {};
    loadResourceMap.forEach((resource, url) => {
      // 图片贴图
      if (!resourceHanlder(url, resource as object, resource as object)) {
        resourceMap.set(url, resource);
        structureMap.set(url, url);
        console.warn(
          `resource manager can not support this resource to generate config`,
          resource
        );
      } else {
        resourceConfig[url] = this.getResourceConfig(url);
      }
    });

    this.dispatchEvent({
      type: "mapped",
      structureMap,
      configMap,
      resourceMap,
      resourceConfig,
    });
    return this;
  }

  /**
   * 获取资源的配置单，该配置单根据资源结构生成
   * @param url 资源url
   * @returns LoadOptions
   */
  getResourceConfig(url: string): LoadOptions {
    // 结构相等直接返回config
    if (!this.structureMap.has(url)) {
      console.warn(`resource manager can not found this url resource: ${url}`);
      return {};
    } else if (this.structureMap.get(url) === url) {
      const config = this.configMap.get(url) as SymbolConfig;
      if (!config) {
        return {};
      } else {
        return {
          [this.configModuleMap[config.type]]: {
            [config.vid]: JSONHandler.clone(config),
          },
        };
      }
    } else {
      const configure = {};
      const configMap = this.configMap;
      const configModuleMap = this.configModuleMap;
      const structure = this.structureMap.get(url)! as ObjectMappingStructure;

      const recursionStructure = (structure) => {
        let config = configMap.get(structure.url)!;
        let module = configModuleMap[config.type];
        if (!configure[module]) {
          configure[module] = {};
        }
        configure[module][config.vid] = JSONHandler.clone(config);

        if (structure.geometry) {
          config = configMap.get(structure.geometry)!;
          module = configModuleMap[config.type];
          if (!configure[module]) {
            configure[module] = {};
          }
          configure[module][config.vid] = JSONHandler.clone(config);
        }

        if (structure.material) {
          config = configMap.get(structure.material)!;
          module = configModuleMap[config.type];
          if (!configure[module]) {
            configure[module] = {};
          }
          configure[module][config.vid] = JSONHandler.clone(config);
        }

        if (structure.children && structure.children.length) {
          for (const objectStructure of structure.children) {
            recursionStructure(objectStructure);
          }
        }
      };

      recursionStructure(structure);

      return configure;
    }
  }

  // TODO: 根据strictureMap去清空configMap和resourceMap
  remove(url: string) {}

  // TODO: dispose
  dispose() {}
}
