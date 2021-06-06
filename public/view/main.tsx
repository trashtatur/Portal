import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {HashRouter} from "react-router-dom";
import PortalPage from "./components/portalPage.component";
import configureStore from "../infrastructure/configureStore";

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <PortalPage/>
        </HashRouter>
    </Provider>,
    document.getElementById("mainApp")
);
