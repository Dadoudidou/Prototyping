import * as React from "react"
import { withStyles, StyleRulesCallback, WithStyles, Paper, Typography, Grid, ListItem, ListItemText, List } from "@material-ui/core";

type classkey = "root" | "listItem" | "listItemTypo" | "title"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        marginTop: 8,
        marginBottom: 8,
        padding: 16,
        height: 150
    },
    listItem: {
        paddingTop: 2,
        paddingBottom: 2
    },
    listItemTypo: {
        display: "inline",
        verticalAlign: "text-bottom"
    },
    title: {
        
        marginBottom: 16
    }
})

const img = require("./imgs/RemplissageActivites.png")

type props = {} & WithStyles<classkey>
export default withStyles(styles)((props: props) => (
    <Paper className={props.classes.root}>
        <Typography variant="subheading" className={props.classes.title}>Taux de remplissage des activités</Typography>
        <Grid container direction="row" style={{justifyContent: "center"}}>
            <Grid item >
                <img src={img} width="100%" />
            </Grid>
        </Grid>
    </Paper>
))