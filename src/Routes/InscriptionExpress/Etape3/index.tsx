import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";
import { getHistory } from "../../../System/Route";


type state = {
    
}


export default class IEEtape3 extends React.PureComponent<any, state>
{

    render(){
        return (
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
                    <DatasIexpress name="iexpress">
                        {(data) => data.data.Step1_adherentSelected != -1 && <div>
                            <div style={{marginTop:"2em", textAlign: "right"}}>
                                <Button variant="raised" color="primary" onClick={() => { }}>
                                    Etape suivante : <br /> 
                                    Générer une facture
                                </Button>
                            </div>
                        </div>}
                    </DatasIexpress>
                </div>
                
            </div>
        )
    }
}
 