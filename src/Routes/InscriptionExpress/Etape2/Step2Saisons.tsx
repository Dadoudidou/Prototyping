import * as React from "react";
import { Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import * as moment from "moment";
import { DatasAdhesions, campagne, adhesion, DatasCampagnes } from "../../../Datas";
import DatasIexpress from "../../../Datas/DatasIexpress";
import Adhesion from "../../../Components/Adhesions/Adhesion";
import { Add } from "@material-ui/icons"
import ModalAddACtivity from "./ModalAddActivity";

type props = {
    showAddActivity?: boolean
    onAddAdhesion?: (campagne: campagne) => void
    onSelectAdhesion?: (adhesion: adhesion) => void
}

export default (props: props) => {
    return (
        <DatasCampagnes name="campagnes">
            {(campagnes) => (
                <DatasAdhesions name="adhesions">
                    {(adhesions) => (
                        <DatasIexpress name="iexpress">
                            {(iexpress) => {
                                // -- adhesions de l'adhérent selectionné
                                let _adhesions = adhesions.data.filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                let _newAdhesions = iexpress.data.adhesions.filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                _adhesions = [..._adhesions, ..._newAdhesions];
                                /*let _campagnes = _adhesions.reduce((tab, x) => {
                                    if(tab.find(t => t.id == x.campagne.id)) return tab;
                                    return [...tab, x.campagne];
                                }, [] as campagne[]);*/
                                let _campagnes = [...campagnes.data];
                                _campagnes.sort((a,b) => {
                                    if(a.nom < b.nom) return -1;
                                    if(a.nom > b.nom) return 1;
                                    return 0;
                                }).reverse()
                                return (
                                    <div>
                                        {_campagnes.map(campagne => (
                                            <section key={campagne.id} style={{marginTop: "2em"}}>
                                                <Typography variant="subheading">{campagne.nom}</Typography>

                                                {props.showAddActivity && campagne.id==_campagnes[0].id && 
                                                <Button fullWidth style={{flexDirection:"column"}} variant="text" onClick={() => props.onAddAdhesion(campagne)}>
                                                    <Add /><span>Ajouter une activité</span>
                                                </Button>}

                                                {_adhesions.filter(x => x.campagne.id == campagne.id).map(adhesion => (
                                                    <Adhesion 
                                                        key={adhesion.id} 
                                                        adhesion={adhesion} 
                                                        button disableValide 
                                                        onClick={() => props.onSelectAdhesion(adhesion)}
                                                    />
                                                ))}

                                                
                                            </section>
                                        ))}
                                    </div>
                                )
                            }}
                        </DatasIexpress>
                    )}
                </DatasAdhesions>
            )}
        </DatasCampagnes>
    )
}