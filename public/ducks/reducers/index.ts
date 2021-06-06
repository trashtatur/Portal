import { combineReducers } from "redux";
import setActiveSystemReducer from "./setActiveSystemReducer";

export type state = {
    activeSystem: string;
}

export default combineReducers({
    activeSystem: setActiveSystemReducer,
})