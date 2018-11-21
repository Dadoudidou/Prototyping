import * as React from "react";
import * as ReactDom from "react-dom"
import { hot } from "react-hot-loader"

import App from "./App";
import { init as initDatas } from "./Datas";

window.scrollTo(0,1);

initDatas();

require("./index.scss");

let Index = () => (<App />);
/*if(module.hot){
    Index = hot(module)(Index)
}*/
ReactDom.render(<Index />, document.getElementById("root"));

//import Test from "./Datas";
//var a = Test.activites;
//console.log(Test.adherents);
