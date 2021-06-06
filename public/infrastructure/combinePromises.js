const combinePromises = (...steps) => {
    const reducer = (accumulatedPromise, nextStep) => accumulatedPromise.then(nextStep)
    return payload => steps.reduce(reducer, Promise.resolve(payload));
}

export default combinePromises;
