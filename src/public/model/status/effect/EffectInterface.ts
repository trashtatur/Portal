export interface EffectInterface<T> {
    from: string;
    active: boolean;

    applyEffect(value: T): T;
}