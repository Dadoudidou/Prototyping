import * as React from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AutoComplete from "../../Adherents/AutoComplete";

type props = {
    onClick?: () => void
}
type state = {}

export default class SearchIcon extends React.PureComponent<props, state>
{
    anchor = undefined
    render(){
        return (
            <div>
                <IconButton color="inherit" onClick={this.props.onClick}><Search /></IconButton>
            </div>
        )
    }
}