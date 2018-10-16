import * as React from "react";
import { adherent, IExpress } from "../../../Datas";
import { ChatOutlined } from "@material-ui/icons"
import { Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import * as moment from "moment";
import DatasIexpress from "../../../Datas/DatasIexpress";
import GridItemForm from "../../../Components/Commons/GridItemForm";
import { onUpdateAdherent } from "./AdherentFormContentInfo";



export default () => {
    return (
        <DatasIexpress name="iexpress">
            {(data) => {
                let adherent = data.data.adherents[data.data.Step1_adherentSelected];
                return (
                <section style={{marginTop: "2em"}}>
                    <Typography variant="subheading">
                        <ChatOutlined style={{ verticalAlign: "middle" }} /> Contact
                    </Typography>
                    <Grid container>
                        <GridItemForm item xs={12}>
                            <TextField 
                                fullWidth
                                multiline
                                label="Adresse"
                                value={adherent.adresse || ""}
                                onChange={(ev) => {
                                    data.update(onUpdateAdherent({
                                        ...adherent,
                                        adresse: ev.target.value
                                    }, data.data))
                                }}
                            />
                        </GridItemForm>
                        <GridItemForm item xs={12}>
                            <TextField 
                                fullWidth
                                label="Ville"
                                value={adherent.ville || ""}
                                onChange={(ev) => {
                                    data.update(onUpdateAdherent({
                                        ...adherent,
                                        ville: ev.target.value
                                    }, data.data))
                                }}
                            />
                        </GridItemForm>
                        <GridItemForm item xs={12}>
                            <TextField 
                                fullWidth
                                type="tel"
                                label="Téléphone"
                                value={adherent.telephone  || ""}
                                onChange={(ev) => {
                                    data.update(onUpdateAdherent({
                                        ...adherent,
                                        telephone: ev.target.value
                                    }, data.data))
                                }}
                            />
                        </GridItemForm>
                        <GridItemForm item xs={12}>
                            <TextField 
                                fullWidth
                                type="email"
                                label="Courriel"
                                value={adherent.email  || ""}
                                onChange={(ev) => {
                                    data.update(onUpdateAdherent({
                                        ...adherent,
                                        email: ev.target.value
                                    }, data.data))
                                }}
                            />
                        </GridItemForm>
                    </Grid>
                </section>
            )}}
        </DatasIexpress>
    )
}