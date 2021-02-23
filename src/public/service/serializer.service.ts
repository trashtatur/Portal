import {deserialize, serialize} from "typescript-json-serializer";

export const serializeData = (data): string => {
    return serialize(data);
}

export const deserializeData = <T>(data, type: { new(...args: any[]): T }): T => {
    return deserialize(data, type);
}

export const deserializeMultiple = <T>(data, type: { new(...args: any[]): T }): T[] => {
    return data.map(singleData => deserializeData(singleData, type))
}

export const serializeMultiple = (data: any[]): string[] => {
    return data.map(singleData => serializeData(singleData));
}