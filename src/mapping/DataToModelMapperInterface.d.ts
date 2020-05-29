export interface DataToModelMapperInterface<T> {
    map(data): T;
    mapMultiple(data): T[];
}