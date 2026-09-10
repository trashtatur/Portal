import {RootState} from "../portal.store";

const selectAllSystems = (state: RootState) => state.systems;

export default selectAllSystems;
