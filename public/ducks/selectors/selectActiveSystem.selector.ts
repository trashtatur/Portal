import { state } from "../reducers";

const selectActiveSystem = (currentState: state): string => currentState.activeSystem;

export default selectActiveSystem;