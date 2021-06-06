const combineSelectors = (mapping) => (state) => (
    Object.entries(mapping).reduce(
    (accumulator, [prop, selector]: [string, Function]) => ({
        ...accumulator,
        [prop]: selector(state),
    }),
    {},
    )
);

export default combineSelectors;
