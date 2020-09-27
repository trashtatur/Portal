
export interface ConverterInterface<T,K> {

    convertEntity(entity: T): K;

    convertMultipleEntities(entities?: T[]): K[] | null;
}