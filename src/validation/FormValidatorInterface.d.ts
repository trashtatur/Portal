export interface FormValidatorInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(data: object): boolean|object;
}