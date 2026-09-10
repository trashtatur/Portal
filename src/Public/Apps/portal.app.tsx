import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import SplashScreen from "../Page-splash-screen/components/splash-screen/splash-screen.component";
import {store} from "../store/portal.store";
import RoutesEnumeration from "../BusinessDomain/enumeration/routes.enumeration";
import PageMain from "../Page-main/components/page-main.component";

const rootElement = document.getElementById('portal-react-entry-point')
console.log(SplashScreen);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path={RoutesEnumeration.HOME} element={<SplashScreen />} />
                <Route path={RoutesEnumeration.MAIN} element={<PageMain />} />
            </Routes>
        </Router>
    </Provider>,
    rootElement
)
