import * as React from "react";
import {Encounter} from "../encounter/Encounter";
import {TopBar} from "../topbar/TopBar";
import * as style from './app.module.css';
import {Form} from "../form/Form";


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