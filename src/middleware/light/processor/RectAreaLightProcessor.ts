import { RectAreaLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { RectAreaLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<RectAreaLightConfig, RectAreaLight>({
  configType: CONFIGTYPE.RECTAREALIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    RectAreaLightConfig,
    RectAreaLight
  >,
  create(config: RectAreaLightConfig, engine: EngineSupport): RectAreaLight {
    return lightCreate(new RectAreaLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
