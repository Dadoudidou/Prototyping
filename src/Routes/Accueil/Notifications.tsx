import * as React from "react"
import { withStyles, StyleRulesCallback, WithStyles, Paper, Typography, Grid, ListItem, ListItemText, List, Tabs, Tab, ListItemIcon } from "@material-ui/core";
import { Error } from "@material-ui/icons"

type classkey = "root" | "alertes" | "alertesIcon"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        marginTop: 8,
        marginBottom: 8,
    },
    alertes : {
        backgroundColor: "#FFCDD2",
        marginTop: 8
    },
    alertesIcon: {
        color: "#B71C1C"
    }
})

const img = require("./imgs/RemplissageActivites.png")

type props = {} & WithStyles<classkey>
export default withStyles(styles)((props: props) => (
    <Paper className={props.classes.root}>
        <Tabs value="alertes" indicatorColor="primary" textColor="primary">
            <Tab value="alertes" label="Alertes" />
            <Tab value="notifications" label="Notifications" />
        </Tabs>
        <div style={{padding:16}}>
            <List>
                <ListItem className={props.classes.alertes}>
                    <ListItemIcon className={props.classes.alertesIcon}>
                        <Error color="error" />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Patrick Delas"
                        secondary="Réglement incomplet"
                    />
                    <ListItemText
                        style={{alignSelf:"flex-start"}}
                        primaryTypographyProps={{
                            style:{ textAlign: "right" }
                        }} 
                        primary="-49,84 €"
                    />
                </ListItem>
                <ListItem  className={props.classes.alertes}>
                    <ListItemIcon className={props.classes.alertesIcon}>
                        <Error color="error" />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Martine Berger"
                        secondary="Certificat médical expiré"
                    />
                </ListItem>
            </List>
        </div>
    </Paper>
))