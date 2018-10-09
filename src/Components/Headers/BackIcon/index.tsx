import * as React from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { getHistory } from "../../../System/Route";

type props = {}
type state = { }

export default class extends React.PureComponent<props, state>
{
    state = {  }
    render(){
        return (
            <div>
                <IconButton color="inherit" onClick={() => getHistory().goBack()}>
                    <ArrowBack />
                </IconButton>
            </div>
        )
    }
}