import * as React from "react"
import MasterHeader from "../../Components/Masters/MasterHeader";
import AutoComplete from "../../Components/Adherents/AutoComplete";
import { Paper, TextField, Button, Typography, Grid, List, ListItem, ListItemText, StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons"
import GraphAdherents from "./GraphAdherents";
import GraphInscriptionCategories from "./GraphInscriptionCategories";
import GraphTauxRemplissageActivites from "./GraphTauxRemplissageActivites";
import GraphTauxPresencesAdherents from "./GraphTauxPresencesAdherents";
import Notifications from "./Notifications";
import withWidth, { isWidthUp, isWidthDown, WithWidth } from "@material-ui/core/withWidth";

const img_adherents = require("./imgs/adherents.png")

type classkey = "GraphItem"
const styles: StyleRulesCallback<classkey> = theme => ({
    GraphItem: {
        height: 250
    }
})

export default withWidth()( withStyles(styles)( (props: Partial<WithWidth> & WithStyles<classkey>) => (
    <div>
        <MasterHeader title="Accueil" />
        <div style={{marginTop:64, padding:16}}>

            <Button>Saison 2017 - 2018 <ArrowDropDown /></Button>

            {isWidthDown('sm', props.width) && <Notifications />}

            <Grid container spacing={16}>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={12} lg={6}>
                            <GraphAdherents />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <GraphInscriptionCategories />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <GraphTauxRemplissageActivites />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <GraphTauxPresencesAdherents />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    {isWidthUp('md', props.width) && <Notifications />}
                </Grid>
            </Grid>

            


        </div>
    </div>
)))