import * as React from "react";
import {TopBar} from "../topbar/TopBar";
import {EncounterManager} from "../encounter/encounter manager/EncounterManager";
import {MediaBar} from "../media menu/MediaBar";
import {ReactElement} from "react";
import * as style from './app.css';




export class App extends React.Component {

    public render(): ReactElement {
        return (
            <div className={style.mainApp}>
                <TopBar/>
                <MediaBar/>
                <EncounterManager/>

            </div>
        )
    }
}