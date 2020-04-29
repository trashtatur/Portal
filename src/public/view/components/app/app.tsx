import * as React from "react";
import {ReactElement} from "react";
import {TopBar} from "../common/topbar/TopBar";
import {PathfinderEncounter} from "../module-battle/pathfinder/encounter/PathfinderEncounter";
import {Route, Switch} from "react-router-dom";
import {AdventureOverview} from "../module-tome/adventureOverview/AdventureOverview";
import {LandingPage} from "../landingPage/LandingPage";
import {RoutesEnum} from "../../../service/RoutesEnum";
import {SingleAdventure} from "../module-tome/singleAdventure/SingleAdventure";
import {SystemsEnum} from "../../../enumeration/SystemsEnum";
import {SystemChoiceBar} from "../common/systemChoiceBar/SystemChoiceBar";
import * as style from './app.css';

interface AppState {
    system: SystemsEnum;
}

export class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            system: this.getSystemFromPotentialLocalStorageEntry()
        }
    }

    getSystemFromPotentialLocalStorageEntry = (): SystemsEnum | null => {
        const localStorageSystemEntry = localStorage.getItem('system')
        if (localStorageSystemEntry) {
            return localStorageSystemEntry as SystemsEnum
        }
        return null;
    }

    setSystem = (system: SystemsEnum): SystemsEnum => {
        if (!system) {
            return;
        }
        localStorage.setItem('system', system)
        this.setState({system: system})
    }

    public render(): ReactElement {
        return (
            <div className={style.mainApp}>
                <Switch>
                    <Route exact path={RoutesEnum.LANDINGPAGE}>
                        <LandingPage/>
                    </Route>
                    <Route exact path={RoutesEnum.BATTLE}>
                        <TopBar/>
                        <SystemChoiceBar setSystem={this.setSystem}/>
                        {
                            this.state.system === SystemsEnum.PATHFINDER &&
                            <PathfinderEncounter/>
                        }
                        {
                            this.state.system === SystemsEnum.DND5 &&
                            <div>HELLO DND</div>
                        }
                    </Route>
                    <Route exact path={RoutesEnum.TOME}>
                        <TopBar/>
                        <SystemChoiceBar setSystem={this.setSystem}/>
                        <AdventureOverview/>
                    </Route>
                    <Route path={RoutesEnum.ADVENTURE}>
                        <TopBar/>
                        <SystemChoiceBar setSystem={this.setSystem}/>
                        <Route path={RoutesEnum.SINGLE_ADVENTURE} component={SingleAdventure}/>
                    </Route>
                </Switch>
            </div>
        )
    }
}