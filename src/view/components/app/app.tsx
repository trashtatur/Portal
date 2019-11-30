import * as React from "react";
import {TopBar} from "../topbar/TopBar";
import {EncounterManager} from "../encounter/encounter manager/EncounterManager";
import {MediaBar} from "../media menu/MediaBar";
import * as style from './app.module.css';




export class App extends React.Component {


    public render(): any {
        return (
            <div className={style.mainApp}>
                <TopBar/>
                <MediaBar/>
                <EncounterManager/>

            </div>
        )
    }
}