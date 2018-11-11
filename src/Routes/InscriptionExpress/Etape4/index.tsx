import * as React from "react"
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, Tabs, Tab, Button, List, ListSubheader, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import AdherentTabs from "./../Etape1/AdherentTabs";
import DatasIexpress from "../../../Datas/DatasIexpress";
import { getHistory } from "../../../System/Route";
import * as moment from "moment"


type state = {
    alertDialog: boolean
}


export default class IEEtape4 extends React.PureComponent<any, state>
{
    constructor(props) {
        super(props);
        this.state = { alertDialog: false }
    }

    state = { alertDialog: false }

    render() {

        return (
            <div>
                <DatasIexpress name="iexpress" forceUpdate={true}>
                    {(iexpress) => {
                        let _tiers = iexpress.data.adherents.find(x => moment().diff(moment(x.dateNaissance), "year") > 18);
                        let _total = 0;
                        iexpress.data.facture.elements.forEach(x => _total += x.montant);
                        return (<div>

                            <div>
                                <MasterHeaderReturn
                                    title="Inscription Express"
                                    toolbar={(
                                        <Toolbar>
                                            <div style={{ width: 48 }}></div>
                                            <Typography variant="title" color="inherit">4/5 - Facture</Typography>
                                        </Toolbar>
                                    )}
                                />
                                <div style={{ marginTop: 130 }}>

                                    <ListItem>
                                        <ListItemText
                                            disableTypography
                                            primary={<div>
                                                <Typography variant="headline">Montant à régler</Typography>
                                                <Typography variant="display1">{_total} €</Typography>
                                            </div>}
                                        />
                                    </ListItem>


                                    <List subheader={<ListSubheader>Tiers Payeur</ListSubheader>}>
                                        <ListItem button>
                                            <ListItemText
                                                disableTypography
                                                primary={<Typography>{_tiers.prenom} {_tiers.nom}</Typography>}
                                                secondary={<div>
                                                    <Typography variant="caption">{_tiers.adresse}</Typography>
                                                    <Typography variant="caption">{_tiers.codepostal} {_tiers.ville}</Typography>
                                                </div>}
                                            />
                                        </ListItem>
                                    </List>

                                    <List subheader={<ListSubheader>Eléments à facturer</ListSubheader>}>
                                        {iexpress.data.facture.elements.map(element => (
                                            <ListItem key={element.id}>
                                                <ListItemText
                                                    disableTypography
                                                    primary={<Typography>{element.nom}</Typography>}
                                                    secondary={<div>
                                                        {element.detail}
                                                        {element.description}
                                                    </div>}
                                                />
                                                <ListItemText
                                                    style={{ alignSelf: "flex-start" }}
                                                    primaryTypographyProps={{
                                                        style: { textAlign: "right" }
                                                    }}
                                                    primary={element.montant}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>

                                    <List>
                                        <Button fullWidth>
                                            Ajouter une remise
                                        </Button>
                                    </List>

                                    {iexpress.data.Step1_adherentSelected != -1 && <div>
                                        <div style={{ marginTop: "2em", textAlign: "right" }}>
                                            <Button variant="raised" color="primary" onClick={() => {
                                                this.setState({ alertDialog: true })
                                            }}>
                                                Etape suivante : <br />
                                                Enregistrer et passer aux réglement
                                            </Button>
                                        </div>
                                    </div>}

                                </div>

                            </div>

                        </div>)
                    }}
                </DatasIexpress>
                <Dialog open={this.state.alertDialog}>
                    <DialogTitle>Enregistrer la facture ?</DialogTitle>
                    <DialogContent>
                        <Typography>
                        Attention !! L'enregistrement de cette facture sera définitif. Il ne sera pas possible de la modifier par la suite.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ ...this.state, alertDialog: false })}>Non</Button>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.setState({ ...this.state, alertDialog: false }, () => {
                                getHistory().push("/InscriptionExpress/Etape5");
                            })
                        }}>Enregistrer et passer aux réglement</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
