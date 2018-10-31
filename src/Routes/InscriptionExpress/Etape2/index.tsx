import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";
import Step2Saisons from "./Step2Saisons";
import { campagne, DatasAdherents, DatasAdhesions } from "../../../Datas";
import ModalAddACtivity from "./ModalAddActivity";
import { getHistory } from "../../../System/Route";


type state = {
    openModal?: boolean
    Modal_Campagne?: campagne
}


export default class extends React.PureComponent<any, state>
{
    state = {
        openModal: false,
        Modal_Campagne: undefined
    }
    render(){
        return (
            <div>
                <MasterHeaderReturn 
                    title="Inscription Express" 
                    toolbar={(
                        <Toolbar>
                            <div style={{width:48}}></div>
                            <Typography variant="title" color="inherit">2/5 - Activités</Typography>
                        </Toolbar>
                    )}
                />

                <div style={{ marginTop: 130 }}>
                    <AdherentTabs disableAddAdherent />
                    <Step2Saisons 
                        showAddActivity
                        onAddAdhesion={(campagne) => {
                            this.setState({
                                openModal: true,
                                Modal_Campagne: campagne
                            })
                        }}
                        onSelectAdhesion={adhesion => { console.log(adhesion)}}
                    />
                    <DatasIexpress name="iexpress" forceUpdate={true}>
                        {(iexpress) => 
                            <ModalAddACtivity 
                                open={this.state.openModal}
                                onClose={() => this.setState({...this.state, openModal: false})}
                                onAddAdhesion={(activite, sessions, tarif) => {
                                    let _equipements = iexpress.data.equipements.filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                    let _adhesions = iexpress.store.getState().DatasReducer["adhesions"].filter(x => x.adherent.id == iexpress.data.adherents[iexpress.data.Step1_adherentSelected].id);
                                    if(_equipements. length == 0 && _adhesions.length > 0){
                                        _equipements.push({
                                            adherent: iexpress.data.adherents[iexpress.data.Step1_adherentSelected],
                                            campagne: this.state.Modal_Campagne,
                                            id: iexpress.data.equipements.length + 1,
                                            nom: "Serviette microfibre ACB",
                                            montant: 0,
                                            montantDescription: "Fourni lors d'un renouvellement annuel"
                                        })
                                    }
                                    iexpress.update({
                                        ...iexpress.data,
                                        adhesions: [
                                            ...(iexpress.data.adhesions || []),
                                            {
                                                campagne: this.state.Modal_Campagne,
                                                activite,
                                                adherent: iexpress.data.adherents[iexpress.data.Step1_adherentSelected],
                                                sessions,
                                                tarif,
                                                id: (iexpress.data.adhesions || []).length + 200
                                            }
                                        ],
                                        equipements: [...iexpress.data.equipements, ..._equipements]
                                    })
                                    this.setState({...this.state, openModal: false});
                                }}
                            />
                        }
                    </DatasIexpress>

                    <DatasIexpress name="iexpress">
                        {(data) => data.data.Step1_adherentSelected != -1 && <div>
                            <div style={{marginTop:"2em", textAlign: "right"}}>
                                <Button variant="raised" color="primary" onClick={() => {
                                    data.update({
                                        ...data.data,
                                        Step1_adherentSelected: 0
                                    });
                                    getHistory().push("/InscriptionExpress/Etape3");
                                }}>
                                    Etape suivante : <br /> 
                                    Ajouter des équipements
                                </Button>
                            </div>
                        </div>}
                    </DatasIexpress>
                </div>
                
            </div>
        )
    }
}
 