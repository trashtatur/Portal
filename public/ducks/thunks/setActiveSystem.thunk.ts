import actions from "../actions";

const setActiveSystem = (system: string) => (dispatch: Function, getState: Function) => {
    dispatch(actions.setActiveSystem(system))
}

export default setActiveSystem;
