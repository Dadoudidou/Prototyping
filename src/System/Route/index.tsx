import * as React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "./NotFoundRoutes"

// -- HISTORY
import { createHashHistory, History } from "history"
let _history = undefined;
export const getHistory = (): History => {
    if(_history == undefined) _history = createHashHistory();
    return _history;
}

// -- ROUTERROUTES
import { RouteProps } from "react-router"
export type RouterRoute = {
    rules?: string[]
} & RouteProps


let _reqRoutes = require.context("./../../Routes/", true, /index\.tsx/);
export const getRoutes = () => {
    let _routes:RouterRoute[] = []
    _reqRoutes.keys().forEach(path => {
        let _component = _reqRoutes(path).default;
        if(_component){
            let _routePath = path.replace("./", "/").replace("/index.tsx","");
            _routes.push({
                path: _routePath,
                component: _component
            })
        }
    })
    return _routes;
}


// -- RENDERROUTES
type RenderRoutesProps = {
    routes: RouterRoute[]
}
export class RenderRoutes extends React.Component<RenderRoutesProps, any>
{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={NotFoundPage as any} />
                {this.props.routes.map((route, index) => {
                    return (
                        <Route key={index} {...route} />
                    )
                })}
                <Route component={NotFoundPage as any} />
            </Switch>
        )
    }
}