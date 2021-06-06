import React, { ReactElement, useState, useEffect} from "react";
import {connect} from "react-redux";
import bootstrapPortal from "../../ducks/thunks/bootstrapPortal.thunk";
import {TopBar} from "./uiProduct/topbar/TopBar";
import {Route, Switch} from "react-router-dom";
import {AdventureOverview} from "./module-tome/adventureOverview/AdventureOverview";
import {LandingPage} from "./landingPage/LandingPage";
import {RoutesEnum} from "../../enumeration/RoutesEnum";
import {SingleAdventure} from "./module-tome/singleAdventure/SingleAdventure";
import {SystemChoiceBarComponent} from "./uiProduct/systemChoiceBar/SystemChoiceBar.component";
import setActiveSystem from "../../ducks/thunks/setActiveSystem.thunk";
import combineSelectors from "../../infrastructure/combineSelectors";
import selectActiveSystem from "../../ducks/selectors/selectActiveSystem.selector"
import style from './portalPage.component.less';

type PortalPageProps = {
    bootstrapPortal: Function;
    setActiveSystem: Function;
    activeSystem?: string;
}

const PortalPage = ({bootstrapPortal, setActiveSystem, activeSystem}: PortalPageProps): ReactElement => {



    const getSystemFromPotentialLocalStorageEntry = (): void => {
        const localStorageSystemEntry = localStorage.getItem('system')
        if (localStorageSystemEntry) {
            setActiveSystem(localStorageSystemEntry)
        }
    }

    const assignSystem = (system: string): string => {
        if (!system) {
            return;
        }
        localStorage.setItem('system', system)
        setActiveSystem(system);
    }

    useEffect(() => {
        bootstrapPortal()
        getSystemFromPotentialLocalStorageEntry()
    }, [])

    return (
        <div className={style.mainApp}>
            <Switch>
                <Route exact path={RoutesEnum.LANDINGPAGE}>
                    <LandingPage/>
                </Route>
                <Route exact path={RoutesEnum.BATTLE}>
                    <TopBar system={activeSystem}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                </Route>
                <Route exact path={RoutesEnum.TOME}>
                    <TopBar system={activeSystem}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                    <AdventureOverview/>
                </Route>
                <Route path={RoutesEnum.ADVENTURE}>
                    <TopBar system={activeSystem}/>
                    <SystemChoiceBarComponent setSystem={assignSystem}/>
                    <Route path={RoutesEnum.SINGLE_ADVENTURE} component={SingleAdventure}/>
                </Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = combineSelectors({
    activeSystem: selectActiveSystem
})

const mapDispatchToProps = {
    bootstrapPortal,
    setActiveSystem
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalPage)