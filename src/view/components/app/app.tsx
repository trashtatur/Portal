import * as React from "react";
import {TopBar} from "../common/topbar/TopBar";
import {EncounterManager} from "../module-battle/encounter/encounter manager/EncounterManager";
import {MediaBar} from "../common/media menu/MediaBar";
import {HashRouter, Route, Switch} from "react-router-dom";
import {ReactElement} from "react";
import {AdventureOverview} from "../module-tome/adventureOverview/AdventureOverview";
import {LandingPage} from "../landingPage/LandingPage";
import {RoutesEnum} from "../../service/RoutesEnum";
import * as style from './app.css';


export class App extends React.Component {

    public render(): ReactElement {
        return (
            <div className={style.mainApp}>
                <Switch>
                    <Route exact path={RoutesEnum.LANDINGPAGE}>
                        <LandingPage/>
                    </Route>
                    <Route exact path={RoutesEnum.BATTLE}>
                        <TopBar/>
                        <EncounterManager/>
                    </Route>
                    <Route exact path={RoutesEnum.TOME}>
                        <TopBar/>
                        <AdventureOverview/>
                    </Route>
                </Switch>
            </div>
        )
    }
}