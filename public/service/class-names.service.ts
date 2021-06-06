/**
 * @param {...(string|boolean)} classes
 * @returns {string}
 */
export const classNames = (...classes): string => classes.filter(c => !!c).join(' ');

