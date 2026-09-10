import {createAsyncThunk} from "@reduxjs/toolkit";
import getAllSystems from "../../api/get-all-systems.api";

const bootstrapMainPageThunk = createAsyncThunk<string[]>(
    'page-main/bootstrap',
    getAllSystems,
)

export default bootstrapMainPageThunk;
