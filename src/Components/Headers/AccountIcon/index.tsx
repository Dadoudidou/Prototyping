import * as React from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

type props = {}
type state = { open: boolean }

export default class AccountIcon extends React.PureComponent<props, state>
{
    state = { open: false }
    anchor = undefined
    render(){
        return (
            <div>
                <IconButton 
                    onClick={(ev) => { this.anchor=ev.currentTarget; this.setState({ open: true }); }}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={this.anchor}
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                >
                    <MenuItem>Profil</MenuItem>
                    <MenuItem>Déconnexion</MenuItem>
                </Menu>
            </div>
        )
    }
}