import * as React from "react";
import {Creature} from "../encounter/creature/Creature";
import {Encounter} from "../encounter/Encounter";
import {TopBar} from "../topbar/TopBar";
import * as style from './app.module.css';


export class App extends React.Component {


    public render(): any {
        return (
            <div className={style.mainApp}>
                <TopBar/>
                <Encounter/>
            </div>
        )
    }
}