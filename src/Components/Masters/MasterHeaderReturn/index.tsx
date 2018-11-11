import * as React from "react"
import { Toolbar, AppBar, Typography, Button, Menu } from "@material-ui/core"

import AccountIcon from "../../Headers/AccountIcon";
import BackIcon from "../../Headers/BackIcon";

type props = {
    title?: string
    toolbar?: React.ReactNode
    noBackIcon?: boolean
}

export default(props: props) => (
    <AppBar>
        <Toolbar>
            {!props.noBackIcon && <BackIcon />}
            <Typography color="inherit" variant="title">{props.title}</Typography>
            <div style={{flexGrow:1}}></div>
            <AccountIcon />
        </Toolbar>
        {props.toolbar}
    </AppBar>
)