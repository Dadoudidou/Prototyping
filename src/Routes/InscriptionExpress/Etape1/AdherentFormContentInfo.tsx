import * as React from "react";
import Datas, { adherent, IExpress } from "../../../Datas";
import { AccountCircleOutlined } from "@material-ui/icons"
import { Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import * as moment from "moment";
import DatasIexpress from "../../../Datas/DatasIexpress";
import GridItemForm from "../../../Components/Commons/GridItemForm";
import AutoComplete from "../../../System/Framer/Components/AutoComplete";
import AdherentsAutoComplete from "../../../Components/Adherents/AdherentsAutoComplete";
import AutoSuggest from "../../../System/Framer/Components/AutoSuggest";
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export const onUpdateAdherent = (adherent: adherent, data: IExpress) => {
    return {
        ...data,
        adherents: data.adherents.map((old, index) => {
            if(index != data.Step1_adherentSelected) return old;
            return adherent
        })
    }
}


export default () => {
    return (
        <DatasIexpress name="iexpress">
            {(data) => {
                let adherent = data.data.adherents[data.data.Step1_adherentSelected];
                return (
                <section style={{marginTop: "2em"}}>
                    <Typography variant="subheading">
                        <AccountCircleOutlined style={{ verticalAlign: "middle" }} /> Informations personnelles
                    </Typography>
                    <Grid container>

                        <GridItemForm item xs={12}>
                            <Grid container direction="row" style={{alignItems:"center"}}>
                                <GridItemForm item  >
                                    <Button style={{
                                        width: 64, height: 64,
                                        padding: 0, display: "block", margin: "auto",
                                        background: "#eee"
                                    }}>
                                        <PhotoCamera />
                                    </Button>
                                </GridItemForm>
                                <Grid item style={{flexGrow:1, paddingLeft: 16}}>
                                    <Grid container direction="column">
                                    <GridItemForm item xs={12}>
                                        <AdherentsAutoComplete 
                                            fullWidth
                                            autoFocus
                                            label="Nom"
                                            value={adherent.nom || ""}
                                            onChange={(ev) => {
                                                data.update(onUpdateAdherent({
                                                    ...adherent,
                                                    nom: ev.target.value
                                                }, data.data))
                                            }}
                                            onSelect={item => data.update(onUpdateAdherent(item, data.data))}
                                        />
                                    </GridItemForm>
                                    <GridItemForm item xs={12}>
                                        <TextField 
                                            fullWidth
                                            label="Prénom"
                                            value={adherent.prenom || ""}
                                            onChange={(ev) => {
                                                data.update(onUpdateAdherent({
                                                    ...adherent,
                                                    prenom: ev.target.value
                                                }, data.data))
                                            }}
                                        />
                                    </GridItemForm>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </GridItemForm>
                        
                        
                        <GridItemForm item xs={12}>
                            <TextField 
                                fullWidth
                                type="date"
                                label="Date de naissance"
                                value={moment(adherent.dateNaissance).format("YYYY-MM-DD")  || ""}
                                onChange={(ev) => {
                                    data.update(onUpdateAdherent({
                                        ...adherent,
                                        dateNaissance: moment(ev.target.value)
                                    }, data.data))
                                }}
                            />
                        </GridItemForm>
                        <GridItemForm item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Sexe</InputLabel>
                                <Select 
                                    value={adherent.sexe || 0}
                                    onChange = {(ev) => {
                                        data.update(onUpdateAdherent({
                                            ...adherent,
                                            sexe: ev.target.value as any
                                        }, data.data))
                                    }}
                                >
                                    <MenuItem value={0}>Masculin</MenuItem>
                                    <MenuItem value={1}>Féminin</MenuItem>
                                </Select>
                            </FormControl>
                        </GridItemForm>
                        
                    </Grid>
                </section>
            )}}
        </DatasIexpress>
    )
}