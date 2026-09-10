export const getEnumKeyForValue = <T>(value: string, enumToSearch: T): T[keyof T] => {
    for (const key of Object.keys(enumToSearch)) {
        if (enumToSearch[key] === value.trim()) {
            return enumToSearch[key]
        }
    }
    return null;
}