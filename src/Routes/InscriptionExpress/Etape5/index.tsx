import * as React from "react"
import DatasIexpress from "../../../Datas/DatasIexpress";
import MasterHeaderReturn from "../../../Components/Masters/MasterHeaderReturn";
import { Toolbar, Typography, ListItem, ListItemText, List, ListSubheader, Button, Menu, MenuItem } from "@material-ui/core";
import { factureReglement } from "../../../Datas";
import * as moment from "moment";
import FacturereglementForm from "../../../Components/Factures/FactureReglementForm";
import { getHistory } from "../../../System/Route";

type state = {
    nbMensualiteDialog: any
    nbMensualite: number
}

export default class IEEtape5 extends React.PureComponent<any, state>
{
    constructor(props){
        super(props);
        this.state = { nbMensualiteDialog: null, nbMensualite: 1 }
    }
    state = { nbMensualiteDialog: null, nbMensualite: 1 }
    anchorElMensualite: any = undefined

    handle_generateReglement = (nb, total) => {
        let _ret:factureReglement[] = [];

        let _sum = total;
        let _step = Math.floor(_sum / nb);
        let _res = _sum;
        for(let i=0; i<nb; i++){
            let _montant = _step;
            if(i==nb-1){
                _montant = _sum - ((nb-1) * _step);
            }
            _ret.push({
                id: i,
                montant: _montant,
                date: moment().add(i, "month").toDate(),
                type: "cheque"
            })
        }
        return _ret;
    }

    render() {

        return (
            <div>
                <DatasIexpress name="iexpress" forceUpdate={true}>
                    {(iexpress) => {
                        let _total = 0;
                        iexpress.data.facture.elements.forEach(x => _total += x.montant);
                        let _regle = _total;
                        (iexpress.data.facture.reglements || []).forEach(x => _regle -= x.montant);
                        return (<div>
                            <MasterHeaderReturn
                                noBackIcon
                                title="Inscription Express"
                                toolbar={(
                                    <Toolbar>
                                        <div style={{ width: 48 }}></div>
                                        <Typography variant="subheading" color="inherit">5/5 - Réglements</Typography>
                                    </Toolbar>
                                )}
                            />
                            <div style={{ marginTop: 130 }}>

                                <ListItem>
                                    <ListItemText
                                        disableTypography
                                        primary={<div>
                                            <Typography variant="subheading">Montant à régler</Typography>
                                            <Typography variant="display1">{_total} €</Typography>
                                        </div>}
                                    />
                                    <ListItemText
                                        disableTypography
                                        primary={<div>
                                            <Typography style={{textAlign: "right"}} variant="subheading">Restant à régler</Typography>
                                            <Typography style={{
                                                textAlign: "right",
                                                color: _regle == 0 ? "#4CAF50" : "#B71C1C"
                                            }} variant="display1">{_regle} €</Typography>
                                        </div>}
                                    />
                                </ListItem>

                                <List subheader={<ListSubheader>Réglements</ListSubheader>}>
                                    <ListItem 
                                        button
                                        innerRef={e => this.anchorElMensualite = e}
                                        onClick={(e) => this.setState({...this.state, nbMensualiteDialog: e.currentTarget})}
                                    >
                                        <ListItemText primary="Nombre de réglements" />
                                        <ListItemText primary={this.state.nbMensualite} />
                                    </ListItem>
                                    
                                    {(iexpress.data.facture.reglements || []).map(reglement => (
                                        <ListItem key={reglement.id}>
                                            <ListItemText 
                                                disableTypography
                                                primary={(
                                                    <FacturereglementForm 
                                                        reglement={reglement}
                                                        onUpdateReglement={(r) => {
                                                            iexpress.update({
                                                                ...iexpress.data,
                                                                facture: {
                                                                    ...iexpress.data.facture,
                                                                    reglements: iexpress.data.facture.reglements.map(x => {
                                                                        if(x.id == r.id) return r;
                                                                        return x;
                                                                    })
                                                                }
                                                            })
                                                        }}
                                                    />
                                                )}
                                            />
                                        </ListItem>
                                        
                                    ))}

                                </List>

                            </div>
                        
                            <Menu anchorEl={this.state.nbMensualiteDialog} open={this.state.nbMensualiteDialog ? true : false} onClose={() => {this.setState({...this.state, nbMensualiteDialog: null})}}>
                                <MenuItem selected={this.state.nbMensualite == 1} onClick={() => {
                                    this.setState({ nbMensualite:1, nbMensualiteDialog: null }, () => {
                                        iexpress.update({
                                            ...iexpress.data,
                                            facture: {
                                                ...iexpress.data.facture,
                                                reglements: this.handle_generateReglement(1, _total)
                                            }
                                        })
                                    })}}>1</MenuItem>
                                <MenuItem selected={this.state.nbMensualite == 2} onClick={() => {
                                    this.setState({ nbMensualite:2, nbMensualiteDialog: null }, () => {
                                        iexpress.update({
                                            ...iexpress.data,
                                            facture: {
                                                ...iexpress.data.facture,
                                                reglements: this.handle_generateReglement(2, _total)
                                            }
                                        })
                                    })}}>2</MenuItem>
                                <MenuItem selected={this.state.nbMensualite == 3} onClick={() => {
                                    this.setState({ nbMensualite:3, nbMensualiteDialog: null }, () => {
                                        iexpress.update({
                                            ...iexpress.data,
                                            facture: {
                                                ...iexpress.data.facture,
                                                reglements: this.handle_generateReglement(3, _total)
                                            }
                                        })
                                    })}}>3</MenuItem>
                                <MenuItem selected={this.state.nbMensualite == 4} onClick={() => {
                                    this.setState({ nbMensualite:4, nbMensualiteDialog: null }, () => {
                                        iexpress.update({
                                            ...iexpress.data,
                                            facture: {
                                                ...iexpress.data.facture,
                                                reglements: this.handle_generateReglement(4, _total)
                                            }
                                        })
                                    })}}>4</MenuItem>
                            </Menu>

                            <div style={{ marginTop: "2em", textAlign: "right" }}>
                                <Button variant="raised" color="primary" disabled={_regle != 0} onClick={() => {
                                    getHistory().push("/InscriptionExpress/Etape6"); 
                                }}>
                                    Enregistrer
                                </Button>
                            </div>

                        </div>)
                    }}
                </DatasIexpress>
            </div>
        )
    }
}