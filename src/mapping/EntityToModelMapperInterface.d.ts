
export interface EntityToModelMapperInterface<T,K> {

    map(entity: T): K;

    mapMultiple(entities?: T[]): K[] | null;
}