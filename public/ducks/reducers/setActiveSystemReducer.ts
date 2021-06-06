import types from "../types";
import { action } from "../actions";

const setActiveSystemReducer = (state = '', action: action) => {
    switch (action.type) {
        case types.SET_ACTIVE_SYSTEM:
            return action.payload;
        default:
            return state;
    }
}

export default setActiveSystemReducer;
