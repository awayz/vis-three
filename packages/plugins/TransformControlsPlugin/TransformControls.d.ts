import { BaseEvent, Camera, Object3D, Quaternion, Raycaster, Vector3 } from "three";
import { TransformControlsGizmo } from "./TransformControlsGizmo";
import { TransformControlsPlane } from "./TransformControlsPlane";
export declare enum TRANSFORM_EVENT {
    HOVER = "hover",
    CHANGE = "change",
    CHANGED = "changed",
    MOUSE_DOWN = "mouseDown",
    CHANGEING = "objectChange",
    MOUSE_UP = "mouseUp"
}
export interface ObjectChangedEvent extends BaseEvent {
    type: TRANSFORM_EVENT.CHANGED;
    transObjectSet: Set<Object3D>;
    mode: string;
    target: Object3D;
}
declare class TransformControls extends Object3D {
    domElement: HTMLElement;
    gizmo: TransformControlsGizmo;
    plane: TransformControlsPlane;
    camera: Camera;
    object: Object3D;
    enabled: boolean;
    mode: "scale" | "position" | "rotation";
    space: "local" | "world";
    axis: string | null;
    translationSnap: number;
    rotationSnap: number;
    scaleSnap: number;
    size: number;
    dragging: boolean;
    showX: boolean;
    showY: boolean;
    showZ: boolean;
    private transObjectSet;
    private cacheObjects;
    worldPosition: Vector3;
    worldPositionStart: Vector3;
    worldQuaternion: Quaternion;
    worldQuaternionStart: Quaternion;
    cameraPosition: Vector3;
    cameraQuaternion: Quaternion;
    pointStart: Vector3;
    pointEnd: Vector3;
    rotationAxis: Vector3;
    rotationAngle: number;
    eye: Vector3;
    _getPointer: (event: any) => void;
    _onPointerDown: (event: any) => void;
    _onPointerHover: (event: any) => void;
    _onPointerMove: (event: any) => void;
    _onPointerUp: (event: any) => void;
    _raycaster: Raycaster;
    _offset: Vector3;
    _startNorm: Vector3;
    _endNorm: Vector3;
    _cameraScale: Vector3;
    _parentPosition: Vector3;
    _parentQuaternion: Quaternion;
    _parentQuaternionInv: Quaternion;
    _parentScale: Vector3;
    _worldScaleStart: Vector3;
    _worldQuaternionInv: Quaternion;
    _worldScale: Vector3;
    _positionStart: Vector3;
    _quaternionStart: Quaternion;
    _scaleStart: Vector3;
    _tempQuaternion: Quaternion;
    _tempVector: Vector3;
    _tempVector2: Vector3;
    _unit: {
        X: Vector3;
        Y: Vector3;
        Z: Vector3;
    };
    constructor(camera: Camera, domElement: HTMLElement);
    setDom(dom: HTMLElement): this;
    setCamera(camera: Camera): this;
    getTransObjectSet(): Set<Object3D>;
    connect(): void;
    disconnect(): void;
    updateMatrixWorld(): void;
    dispose(): void;
    attach(): this;
    detach(): this;
    setAttach(...object: Object3D[]): this;
    getMode(): "position" | "scale" | "rotation";
    setMode(mode: any): void;
    setTranslationSnap(translationSnap: any): void;
    setRotationSnap(rotationSnap: any): void;
    setScaleSnap(scaleSnap: any): void;
    setSize(size: any): void;
    setSpace(space: any): void;
    intersectObjectWithRay(object: any, raycaster: any, includeInvisible?: any): any;
    pointerHover(pointer: any): void;
    pointerDown(pointer: any): void;
    pointerMove(pointer: any): void;
    pointerUp(pointer: any): void;
    getPointer(event: any): {
        x: number;
        y: number;
        button: any;
    };
    onPointerDown(event: any): void;
    onPointerHover(event: any): void;
    onPointerMove(event: any): void;
    onPointerUp(event: any): void;
}
export { TransformControls, TransformControlsGizmo, TransformControlsPlane };
