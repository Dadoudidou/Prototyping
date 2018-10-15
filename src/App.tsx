import * as React from "react";


// -- config moment
import * as moment from "moment";
moment.locale("fr");

// -- ROUTER
import { HashRouter } from "react-router-dom";
import { getRoutes, RenderRoutes } from "./System/Route";

// -- STORE
// ---- redux
import { Provider as ReduxProvider } from "react-redux"
import reduxClient from "./System/Framer/Datas/Store"


// -- THEME
import { create as createJss } from "jss";
import { JssProvider } from "react-jss";
import * as jss_preset_default from "jss-preset-default";
const jss = createJss();
jss.setup(jss_preset_default);

import { MuiThemeProvider, createMuiTheme, colors } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: colors.blue,
        secondary: colors.deepOrange
    },
    overrides: {
        MuiMenuItem: {
            selected: {
                backgroundColor: `${colors.deepOrange["100"]} !important`
            }
        }
    }
})

const App = () => (
    <HashRouter>
        <ReduxProvider store={reduxClient}>
            <JssProvider Jss={jss}>
                <MuiThemeProvider theme={theme}>
                    <RenderRoutes routes={getRoutes()} />
                </MuiThemeProvider>
            </JssProvider>
        </ReduxProvider>
    </HashRouter>
)

import { hot } from "react-hot-loader"
export default hot(module)(App);

/*if(module.hot){/
    export default hot(module)(App);
} else {
    export default App;
}*/
