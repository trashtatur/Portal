export interface FormValidatorInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(data): boolean|object;
}