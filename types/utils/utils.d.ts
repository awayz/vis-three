export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function getConfigModelMap(): {
    [key: string]: string;
};
export declare function getConfigFunctionMap(): {
    [key: string]: Function;
};
