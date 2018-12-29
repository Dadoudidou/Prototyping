import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./AdherentTabs";
import AdherentFormContentInfo from "./AdherentFormContentInfo";
import DatasIexpress from "../../../Datas/DatasIexpress";
import AdherentFormContentContact from "./AdherentFormContentContact";
import { getHistory } from "../../../System/Route";


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
                            <Typography variant="subheading" color="inherit">1/5 - Adhérents</Typography>
                        </Toolbar>
                    )}
                />
                <div style={{ marginTop: 130 }}>
                    <AdherentTabs />
                    <DatasIexpress name="iexpress">
                        {(data) => data.data.Step1_adherentSelected != -1 && <div>
                            <AdherentFormContentInfo />
                            <AdherentFormContentContact />
                            <div style={{marginTop:"2em", textAlign: "right"}}>
                                <Button variant="raised" color="primary" onClick={() => {
                                    data.update({
                                        ...data.data,
                                        Step1_adherentSelected: 0
                                    });
                                    getHistory().push("/InscriptionExpress/Etape2");
                                }}>
                                    Etape suivante : <br /> 
                                    Ajouter des activités aux adhérents
                                </Button>
                            </div>
                        </div>}
                    </DatasIexpress>
                </div>
                
            </div>
        )
    }
}
 