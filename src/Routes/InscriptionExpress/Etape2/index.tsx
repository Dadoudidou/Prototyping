import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";
import Step2Saisons from "./Step2Saisons";
import { campagne } from "../../../Datas";
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
                                    console.log("new adhesion", activite, sessions, tarif);
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
                                        ]
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
 