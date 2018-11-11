import * as React from "react"
import { withStyles, StyleRulesCallback, WithStyles, Paper, Typography, Grid, ListItem, ListItemText, List } from "@material-ui/core";

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
        textAlign:"center",
        marginBottom: 16
    }
})

const img_adherents = require("./imgs/adherents.png")

type props = {} & WithStyles<classkey>
export default withStyles(styles)((props: props) => (
    <Paper className={props.classes.root}>
        <Typography variant="headline" className={props.classes.title}>628 Adhérents</Typography>
        <Grid container direction="row">
            <Grid item xs={4}>
                <img src={img_adherents} width="100%" />
            </Grid>
            <Grid item xs={8}>
                <List>
                    <ListItem  className={props.classes.listItem}>
                        <ListItemText 
                            disableTypography
                            primary={<div>
                                <div style={{ display:"inline-block", width:16, height:16, marginRight: 8, backgroundColor: "#0099FF" }} />
                                <Typography className={props.classes.listItemTypo}>Renouvellements (439)</Typography>
                            </div>}
                        />
                    </ListItem>
                    <ListItem className={props.classes.listItem}>
                        <ListItemText 
                            disableTypography
                            primary={<div>
                                <div style={{ display:"inline-block", width:16, height:16, marginRight: 8, backgroundColor: "#FF9966" }} />
                                <Typography className={props.classes.listItemTypo}>Nouveaux (174)</Typography>
                            </div>}
                        />
                    </ListItem>
                    <ListItem className={props.classes.listItem}>
                        <ListItemText 
                            disableTypography
                            primary={<div>
                                <div style={{ display:"inline-block", width:16, height:16, marginRight: 8, backgroundColor: "#CCCC66" }} />
                                <Typography className={props.classes.listItemTypo}>Transfert (15)</Typography>
                            </div>}
                        />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    </Paper>
))