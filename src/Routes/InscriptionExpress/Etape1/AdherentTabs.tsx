import * as React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import DatasIexpress from "../../../Datas/DatasIexpress";
import { adherent } from "../../../Datas";

type props = {
    disableAddAdherent?: boolean
}

export default class extends React.PureComponent<props, any>
{
    render(){
        return (
            <DatasIexpress name="iexpress">
                {iexpress => (
                    <div>
                        <Tabs 
                            scrollable
                            fullWidth
                            value={iexpress.data.Step1_adherentSelected}
                            onChange={(event, value) => {
                                if(value == -1){
                                    let _adherent: adherent = {};
                                    if(iexpress.data.adherents.length > 0) _adherent = iexpress.data.adherents[0];
                                    iexpress.update({
                                        ...iexpress.data,
                                        adherents: [
                                            ...iexpress.data.adherents, 
                                            {
                                                nom: _adherent.nom,
                                                adresse: _adherent.adresse,
                                                codepostal: _adherent.codepostal,
                                                ville: _adherent.ville
                                            }
                                        ],
                                        Step1_adherentSelected: iexpress.data.adherents.length
                                    })
                                } else {
                                    iexpress.update({
                                        ...iexpress.data,
                                        Step1_adherentSelected: value
                                    })}
                                }
                            }
                        >
                            {iexpress.data.adherents.map((adherent, index) => (
                                <Tab key={index} value={index} label={`${adherent.prenom || "Nouvel adhérent"}`} />
                            ))}
                            {!this.props.disableAddAdherent &&
                                <Tab value={-1} label={(<AddCircleOutline />)} />
                            }
                        </Tabs>
                    </div>
                )}
            </DatasIexpress>
        )
    }
}