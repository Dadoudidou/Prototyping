import * as React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
// /InscriptionExpress/Etape1
export default () => (
    <div>
        <List>
            <ListItem button component={Link} {...{to: "/InscriptionExpress/Etape1"}}>
                <ListItemText primary="Inscription Express" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Adhérents" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Campagnes" />
            </ListItem>
        </List>
    </div>
)