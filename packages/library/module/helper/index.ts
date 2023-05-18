import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
import { HelperRule } from "./HelperRule";
import HelperProcessor from "./processors/ObjectHelperProcessor";

export * from "./expand/objectHelper";
export * from "./HelperConfig";
export * from "./HelperCompiler";

export default {
  type: "helper",
  compiler: HelperCompiler,
  rule: HelperRule,
  processors: [HelperProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};
