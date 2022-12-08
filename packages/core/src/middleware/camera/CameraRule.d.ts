import { Camera } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
export type CameraRule = ObjectRule<CameraCompiler, CameraConfigAllType, Camera>;
export declare const CameraRule: CameraRule;
