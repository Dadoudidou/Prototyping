import * as React from "react"
import { Dialog, DialogTitle, DialogContent, List, ListItem, Typography, IconButton, ListItemText, Grid, Button, DialogActions, Checkbox, FormControlLabel, Radio } from "@material-ui/core";
import { DatasActivites, session, tarif, activite } from "../../../Datas";
import Activite from "../../../Components/Activites/Activite";
import SwipeableViews from 'react-swipeable-views';
import { ArrowLeft } from "@material-ui/icons"
import Session from "../../../Components/Activites/Session";
import Tarif from "../../../Components/Activites/Tarif";


type props = {
    open?: boolean
    onClose?: () => void
}
type state = {
    activitySelected?: activite
    sessionsSelected?: session[]
    tarifSelected?: tarif
    openSessions?: boolean
    openTarifs?: boolean


}

export default class ModalAddACtivity extends React.PureComponent<props, state>
{
    constructor(props){
        super(props);
        this.state = { activitySelected: undefined }
    }
    componentWillReceiveProps(nextProps: props){
        if(nextProps.open != this.props.open && nextProps.open == true){
            this.setState({
                activitySelected: undefined,
                openSessions: false,
                openTarifs: false
            })
        }
    }
    handle_onSelectActivite = (activite: activite) => {
        let _sessions = undefined;
        let _tarif = undefined;
        if(!activite) {
            this.setState({ activitySelected: undefined, sessionsSelected: undefined, tarifSelected: undefined });
            return;
        }
        if(activite.tarifs && activite.tarifs.length == 1){
            _tarif = activite.tarifs[0];
            _sessions = activite.sessions;
        }
        this.setState({
            activitySelected: activite,
            tarifSelected: _tarif,
            sessionsSelected: _sessions
        })
    }


    renderTarif = () => {
        return (
            <ListItem button divider>
                <ListItemText 
                    primary="Tarifs" 
                    secondary={
                        !this.state.tarifSelected ?
                        "Sélectionner un tarif"
                        :
                        <Tarif tarif={this.state.tarifSelected} />
                    }
                    secondaryTypographyProps={{ component: "div" }}
                />
            </ListItem>
        )
    }

    renderSessions = () => {
        return (
            <ListItem 
                button divider
                onClick={() => {
                    if(this.state.activitySelected.tarifs && this.state.activitySelected.tarifs.length > 1){
                        this.setState({
                            ...this.state, 
                            openSessions: true,
                        });
                    }
                }}
            >
                <ListItemText 
                    primary="Sessions" 
                    secondary={
                        !this.state.sessionsSelected || this.state.sessionsSelected.length == 0 ?
                        "Sélectionner les sessions auxquelles l'adhérent viendra."
                        :
                        <div>
                            {this.state.sessionsSelected.map(x => <Session variant="caption" key={x.id} session={x} />)}
                        </div>
                    }
                    secondaryTypographyProps={{ component: "div" }}
                />
            </ListItem>
        )
    }

    renderDialogSessions = () => {
        return (
            <Dialog open={this.state.openSessions}>
                <DialogTitle>Sessions</DialogTitle>
                <DialogContent>
                    {this.state.openSessions && this.state.activitySelected.sessions.map(session => (
                        <FormControlLabel 
                            key={session.id}
                            control={
                                <Checkbox 
                                    checked={(this.state.sessionsSelected || []).find(x => x.id == session.id) != undefined}
                                    onChange={() => {
                                        let _fsession = (this.state.sessionsSelected || []).find(x => x.id == session.id);
                                        let _sessions = [...this.state.sessionsSelected];
                                        if(_fsession) _sessions = _sessions.filter(x => x.id != _fsession.id);
                                        else _sessions = [..._sessions, session];

                                        this.setState({
                                            ...this.state,
                                            sessionsSelected: _sessions
                                        })
                                    }}
                                />
                            }
                            label={<Session session={session} />}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ ...this.state, openSessions: false })}>Fermer</Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderDialogTarif = () => {
        return (
            <Dialog open={this.state.openTarifs}>
                <DialogTitle>Tarifs</DialogTitle>
                <DialogContent>
                    {this.state.openTarifs && this.state.activitySelected.tarifs.map(tarif => (
                        <FormControlLabel 
                            key={tarif.id}
                            control={
                                <Radio 
                                    checked={this.state.tarifSelected && this.state.tarifSelected.id == tarif.id}
                                    onChange={() => {
                                        this.setState({
                                            ...this.state,
                                            tarifSelected: tarif
                                        })
                                    }}
                                />
                            }
                            label={<Tarif tarif={tarif} />}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ ...this.state, openSessions: false })}>Fermer</Button>
                </DialogActions>
            </Dialog>
        )
    }

    render(){
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} fullWidth PaperProps={{ style:{ margin: 16 } }}>
                <DialogTitle>Ajouter une activité</DialogTitle>
                <DialogContent style={{paddingLeft:0, paddingRight:0}}>
                    <SwipeableViews
                        ignoreNativeScroll
                        animateHeight
                        index={this.state.activitySelected ? 1 : 0}
                        tabIndex={this.state.activitySelected ? 1 : 0}
                    >
                        <DatasActivites name="activites">
                            {(activites) => (
                                
                                    <List>
                                        {activites.data.map(activite => (
                                            <ListItem 
                                                key={activite.id}
                                                button
                                                onClick={() => this.handle_onSelectActivite(activite)}
                                            >
                                                <Activite activite={activite} />
                                            </ListItem>
                                        ))}
                                    </List>
                                    
                            )}
                        </DatasActivites>
                        <div>
                            {this.state.activitySelected && <div>
                                <Grid container>
                                    <Grid item>
                                        <IconButton onClick={() => this.handle_onSelectActivite(undefined)}>
                                            <ArrowLeft />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Activite activite={this.state.activitySelected} />
                                    </Grid>
                                </Grid>

                                <Typography style={{padding: 8}}>
                                    Description de {this.state.activitySelected.section}
                                </Typography>
                                <List>
                                    {this.renderSessions()}
                                    {this.renderTarif()}
                                </List>
                                
                                <div style={{padding:8, paddingTop: 16}}>
                                    <Button 
                                        color="primary" 
                                        fullWidth variant="contained" 
                                        disabled={!this.state.tarifSelected || !this.state.sessionsSelected}
                                    >Ajouter l'activité</Button>
                                </div>

                                {this.renderDialogSessions()}
                                
                            </div>}
                            
                        </div>
                    </SwipeableViews>
                </DialogContent>
            </Dialog>
        )
    }
}