import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";
import { getHistory } from "../../../System/Route";
import Step3Saisons from "./Step3Saisons";
import { generateFacture } from "../../../Components/Factures";


type state = {
    alertDialog: boolean
}


export default class IEEtape3 extends React.PureComponent<any, state>
{
    constructor(props){
        super(props);
        this.state={ alertDialog: false }
    }

    render(){
        return (
            <DatasIexpress name="iexpress" forceUpdate={true}>
                {(data) => data.data.Step1_adherentSelected != -1 && <div>

            <div>
                <MasterHeaderReturn 
                    title="Inscription Express" 
                    toolbar={(
                        <Toolbar>
                            <div style={{width:48}}></div>
                            <Typography variant="title" color="inherit">3/5 - Equipements</Typography>
                        </Toolbar>
                    )}
                />
                <div style={{ marginTop: 130 }}>
                
                    <AdherentTabs disableAddAdherent />
                    <Step3Saisons showAddEquipement />
                    
                            <div style={{marginTop:"2em", textAlign: "right"}}>
                                <Button variant="raised" color="primary" onClick={() => { 
                                    let _facture = generateFacture(data.data.adhesions, data.data.equipements);
                                    data.update({
                                        ...data.data,
                                        facture: _facture
                                    });
                                    getHistory().push("/InscriptionExpress/Etape4"); 
                                }}>
                                    Etape suivante : <br /> 
                                    Générer une facture
                                </Button>
                            </div>
                        
                    {/*<Dialog open={this.state.alertDialog}>
                        <DialogTitle>Générer une facture ?</DialogTitle>
                        <DialogContent>
                            Attention vous ne pourrez pas revenir en arrière.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({ ...this.state, alertDialog: false })}>Non</Button>
                            <Button variant="contained" color="primary" onClick={() => {
                                this.setState({ ...this.state, alertDialog: false }, () => {

                                    getHistory().push("/InscriptionExpress/Etape4");
                                })
                            }}>Générer une facture</Button>
                        </DialogActions>
                        </Dialog>*/}
                </div>
                
            </div>

            </div>}
            </DatasIexpress>
        )
    }
}
 