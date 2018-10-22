import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";


type state = {
    
}


export default class extends React.PureComponent<any, state>
{

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
                    <DatasIexpress name="iexpress">
                        {(data) => data.data.Step1_adherentSelected != -1 && <div>
                            <div style={{marginTop:"2em", textAlign: "right"}}>
                                <Button variant="raised" color="primary">
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
 