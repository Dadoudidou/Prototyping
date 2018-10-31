import * as React from "react";
import { Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import * as moment from "moment";
import { DatasAdhesions, campagne, adhesion, DatasCampagnes, DatasEquipements } from "../../../Datas";
import DatasIexpress from "../../../Datas/DatasIexpress";
import Adhesion from "../../../Components/Adhesions/Adhesion";
import { Add } from "@material-ui/icons"
import Equipement from "../../../Components/Adhesions/Equipement";

type props = {
    showAddEquipement?: boolean
    onAddAdhesion?: (campagne: campagne) => void
    onSelectAdhesion?: (adhesion: adhesion) => void
}

export default (props: props) => {
    return (
        <DatasCampagnes name="campagnes">
            {(campagnes) => (
                <DatasEquipements name="equipements">
                    {(equipements) => (
                        <DatasIexpress name="iexpress">
                            {(iexpress) => {
                                // -- adhesions de l'adhérent selectionné
                                let _equipements = equipements.data.filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                let _newEquip = iexpress.data.equipements.filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                _equipements = [..._equipements, ..._newEquip];
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

                                                {props.showAddEquipement && campagne.id==_campagnes[0].id && 
                                                <Button fullWidth style={{flexDirection:"column"}} variant="text" onClick={() => {}}>
                                                    <Add /><span>Ajouter un équipement</span>
                                                </Button>}

                                                {_equipements.filter(x => x.campagne.id == campagne.id).map(equipement => (
                                                    <Equipement 
                                                        key={equipement.id} 
                                                        equipement={equipement} 
                                                        button disableValide 
                                                        onClick={() => {}}
                                                    />
                                                ))}

                                                
                                            </section>
                                        ))}
                                    </div>
                                )
                            }}
                        </DatasIexpress>
                    )}
                </DatasEquipements>
            )}
        </DatasCampagnes>
    )
}