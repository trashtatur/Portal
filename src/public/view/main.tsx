import * as React from "react";
import {createRoot} from "react-dom/client";
import {HashRouter} from "react-router-dom";
import {App} from "./components/app/app";
import "./static/global.css";


createRoot(document.getElementById("mainApp")!).render(
    <HashRouter>
        <App/>
    </HashRouter>
);
