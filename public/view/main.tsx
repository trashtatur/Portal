import * as React from "react";
import * as ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {PortalPageComponent} from "./components/portalPage.component";


ReactDOM.render(
    <HashRouter>
        <PortalPageComponent/>
    </HashRouter>,
    document.getElementById("mainApp")
);
