import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import { DatasIexpress } from "../../../Datas";


type state = {
    
}


export default class extends React.PureComponent<any, state>
{
    renderTabs = () => (
        <DatasIexpress name="iexpress">
            {iexpress => (
                <div>
                    <Tabs 
                        scrollable
                        fullWidth
                        value={iexpress.data.Step1_adherentSelected}
                        onChange={(event, value) => iexpress.update({
                            ...iexpress.data,
                            Step1_adherentSelected: value
                        })}
                    >
                        {iexpress.data.adherents.map((adherent, index) => (
                            <Tab key={index} value={index} label={`${adherent.prenom || "Nouvel adhérent"}`} />
                        ))}
                        <Tab value={-1} label={(<AddCircleOutline />)} />
                    </Tabs>
                </div>
            )}
        </DatasIexpress>
    )
    render(){
        return (
            <div>
                <MasterHeaderReturn 
                    title="Inscription Express" 
                    toolbar={(
                        <Toolbar>
                            <div style={{width:48}}></div>
                            <Typography variant="title" color="inherit">1/5 - Adhérents</Typography>
                        </Toolbar>
                    )}
                />
                <div style={{ marginTop: 130 }}>
                    {this.renderTabs()}
                </div>
                
            </div>
        )
    }
}
 