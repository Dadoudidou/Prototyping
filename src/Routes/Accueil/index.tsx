import * as React from "react"
import MasterHeader from "../../Components/Masters/MasterHeader";
import AutoComplete from "../../Components/Adherents/AutoComplete";
import { Paper, TextField, Button, Typography, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons"
import GraphAdherents from "./GraphAdherents";
import GraphInscriptionCategories from "./GraphInscriptionCategories";
import GraphTauxRemplissageActivites from "./GraphTauxRemplissageActivites";
import GraphTauxPresencesAdherents from "./GraphTauxPresencesAdherents";
import Notifications from "./Notifications";

const img_adherents = require("./imgs/adherents.png")

export default () => (
    <div>
        <MasterHeader title="Accueil" />
        <div style={{marginTop:64, padding:16}}>

            <Button>Saison 2017 - 2018 <ArrowDropDown /></Button>

            <Notifications />

            <GraphAdherents />
            <GraphInscriptionCategories />
            <GraphTauxRemplissageActivites />
            <GraphTauxPresencesAdherents />
        </div>
    </div>
)