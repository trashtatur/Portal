import types from "./types";

export type action = {
    payload: any;
    type: string;
}
const actions = {
    setActiveSystem: (payload): action => ({payload, type: types.SET_ACTIVE_SYSTEM}),
}

export default actions;