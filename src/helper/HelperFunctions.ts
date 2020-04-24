export const getEnumKeyForValue = <T> (value: string, enumToSearch: T): T => {
    for (const key of Object.keys(enumToSearch)) {
        if (enumToSearch[key] === value) {
            return enumToSearch[key]
        }
    }
    return null;
}