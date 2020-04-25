import * as React from "react";
import {TopBar} from "../common/topbar/TopBar";
import {Encounter} from "../module-battle/encounter/Encounter";
import {MediaBar} from "../common/media menu/MediaBar";
import {Route, Switch} from "react-router-dom";
import {ReactElement} from "react";
import {AdventureOverview} from "../module-tome/adventureOverview/AdventureOverview";
import {LandingPage} from "../landingPage/LandingPage";
import {RoutesEnum} from "../../../service/RoutesEnum";
import {SingleAdventure} from "../module-tome/singleAdventure/SingleAdventure";
import * as style from './app.css';


export class App extends React.Component {

    public render(): ReactElement {
        return (
            <div className={style.mainApp}>
                <Switch>
                    <Route exact path={RoutesEnum.LANDINGPAGE}>
                        <LandingPage />
                    </Route>
                    <Route exact path={RoutesEnum.BATTLE}>
                        <TopBar/>
                        <Encounter />
                    </Route>
                    <Route exact path={RoutesEnum.TOME}>
                        <TopBar />
                        <AdventureOverview />
                    </Route>
                    <Route path={RoutesEnum.ADVENTURE}>
                        <TopBar/>
                        <Route path={RoutesEnum.SINGLE_ADVENTURE} component={SingleAdventure}/>
                    </Route>

                </Switch>
            </div>
        )
    }
}