import React, { ReactElement, useState} from "react";
import {TopBar} from "./uiProduct/topbar/TopBar";
import {Route, Switch} from "react-router-dom";
import {AdventureOverview} from "./module-tome/adventureOverview/AdventureOverview";
import {LandingPage} from "./landingPage/LandingPage";
import {RoutesEnum} from "../../enumeration/RoutesEnum";
import {SingleAdventure} from "./module-tome/singleAdventure/SingleAdventure";
import {SystemChoiceBarComponent} from "./uiProduct/systemChoiceBar/SystemChoiceBar.component";
import * as style from './portalPage.component.less';

export const PortalPageComponent = (): ReactElement => {

    const getSystemFromPotentialLocalStorageEntry = (): string | null => {
        const localStorageSystemEntry = localStorage.getItem('system')
        if (localStorageSystemEntry) {
            return localStorageSystemEntry
        }
        return null;
    }

    const [system, setSystem] = useState(getSystemFromPotentialLocalStorageEntry())

    const assignSystem = (system: string): string => {
        if (!system) {
            return;
        }
        localStorage.setItem('system', system)
        setSystem(system);
    }

    return (
        <div className={style.mainApp}>
            <Switch>
                <Route exact path={RoutesEnum.LANDINGPAGE}>
                    <LandingPage/>
                </Route>
                <Route exact path={RoutesEnum.BATTLE}>
                    <TopBar system={system}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                </Route>
                <Route exact path={RoutesEnum.TOME}>
                    <TopBar system={system}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                    <AdventureOverview/>
                </Route>
                <Route path={RoutesEnum.ADVENTURE}>
                    <TopBar system={system}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                    <Route path={RoutesEnum.SINGLE_ADVENTURE} component={SingleAdventure}/>
                </Route>
            </Switch>
        </div>
    )
}