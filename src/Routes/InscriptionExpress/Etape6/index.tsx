import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Button, Typography } from "@material-ui/core";
import { getHistory } from "../../../System/Route";
import DatasIexpress from "../../../Datas/DatasIexpress";


export default () => (
    <div>
        <MasterHeaderReturn
            noBackIcon
            title="Inscription Express"
        />
        <div style={{ marginTop: 130 }}>
            <div style={{padding: 8}}>
                <Typography style={{textAlign: "center"}}>
                    Les réglements ont bien été enregistrés.
                </Typography>
                <br />
                <Button fullWidth>Envoyer la facture à l'adhérent par mail</Button>
                <Button fullWidth>Imprimer la facture</Button>
                <br />
                <br />
                <br />
                <Button fullWidth onClick={() => getHistory().replace("/")}>Aller à l'accueil</Button>
                <br />
                <DatasIexpress name="iexpress">
                    {(iexpress) => (
                        <div>
                    
                        <Button fullWidth variant="raised" color="primary"
                            onClick={() => {
                                iexpress.update({
                                    adherents: [],
                                    adhesions: [],
                                    equipements: [],
                                    facture: undefined,
                                    Step1_adherentSelected: -1
                                })
                                getHistory().replace("/InscriptionExpress/Etape1");
                            }}
                        >Nouvelle inscription</Button>
                        <br />

                    </div>
                    )}
                </DatasIexpress>
                

            </div>
        </div>
        
    </div>
)