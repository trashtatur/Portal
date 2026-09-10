export const serializePlainObject = (data: unknown): string => JSON.stringify(data);

export const deserializePlainObject = <T>(data: unknown): T => {
    if (typeof data === 'string') {
        return JSON.parse(data) as T;
    }
    return JSON.parse(JSON.stringify(data)) as T;
};