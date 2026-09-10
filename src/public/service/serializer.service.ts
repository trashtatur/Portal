import {deserialize, serialize} from "typescript-json-serializer";

export const serializeData = (data): string => {
    return serialize(data);
}

export const deserializeData = <T>(data, type: { new(...args: any[]): T } | ((data: any) => T)): T => {
    return type.prototype ? deserialize(data, type as { new(...args: any[]): T }) : type(data);
}

export const deserializeMultiple = <T>(data, type: { new(...args: any[]): T } | ((data: any) => T)): T[] => {
    return data.map(singleData => deserializeData(singleData, type))
}

export const serializeMultiple = (data: any[]): string[] => {
    return data.map(singleData => serializeData(singleData));
}
