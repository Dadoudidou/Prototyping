import * as React from "react"
import { withStyles, StyleRulesCallback, WithStyles, Paper, Typography, Grid, ListItem, ListItemText, List } from "@material-ui/core";
import ChartDonut from "../../Components/Charts/ChartDonut";

type classkey = "root" | "listItem" | "listItemTypo" | "title"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        marginTop: 8,
        marginBottom: 8,
        padding: 16
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

const img = require("./imgs/InscriptionParCategorie.png")

type props = {} & WithStyles<classkey>
export default withStyles(styles)((props: props) => (
    <Paper className={props.classes.root}>
        <Typography variant="subheading" className={props.classes.title}>Inscriptions par catégories</Typography>
        <Grid container direction="row" style={{justifyContent: "center"}}>
            <Grid item >
                <ChartDonut />
            </Grid>
        </Grid>
    </Paper>
))