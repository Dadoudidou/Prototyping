import * as React from "react"
import { Paper, Grid, TextField, withStyles, StyleRulesCallback, WithStyles } from "@material-ui/core";
import { factureReglement } from "../../Datas";
import * as moment from "moment"

type classkey = "textfield" | "root" | "montant"


const styles : StyleRulesCallback<classkey> = theme => ({
    textfield: {
        //margin: `${theme.spacing.unit}px ${theme.spacing.unit}px`
    },
    root : {
        //display: "flex",
        padding: theme.spacing.unit,
        margin: `${theme.spacing.unit * 2}px 0`
    },
    montant: {
        width: "70px"
    }
})

type props = {
    reglement: factureReglement
    onUpdateReglement: (reglement: factureReglement) => void
}
type state = {}

export default  withStyles(styles)(class FacturereglementForm extends React.PureComponent<props  & WithStyles<classkey>, state>
{
    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item md={4} xs={12}>
                        <TextField 
                            fullWidth
                            label="Montant"
                            classes={{ root: `${classes.textfield}` }}
                            type="number"
                            value={this.props.reglement.montant}
                            onChange={event => {
                                this.props.onUpdateReglement({
                                    ...this.props.reglement,
                                    montant: parseFloat(event.target.value)
                                });
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField 
                            fullWidth
                            label="Type"
                            classes={{ root: classes.textfield }}
                            select
                            value={this.props.reglement.type}
                            onChange={event => {
                                console.log(event.target.value);
                                this.props.onUpdateReglement({
                                    ...this.props.reglement,
                                    type: event.target.value
                                });
                            }}
                            SelectProps={{ native: true }}
                        >
                            <option value="cheque">Chèque</option>
                            <option value="cheque vacance">Chèque vacance</option>
                            <option value="liquide">Liquide</option>
                        </TextField>
                    </Grid>
                
                    <Grid item md={4} xs={12}>
                        <TextField 
                            fullWidth
                            label="Echéance"
                            classes={{ root: classes.textfield }}
                            value={moment(this.props.reglement.date).format("YYYY-MM-DD")}
                            type="date"
                            onChange={event => {
                                this.props.onUpdateReglement({
                                    ...this.props.reglement,
                                    date: moment(event.target.value).toDate()
                                });
                            }}
                        />
                    </Grid>
                    {(this.props.reglement.type=="cheque" ||
                    this.props.reglement.type=="cheque vacance") &&
                        <Grid item md={6} xs={12}>
                            <TextField 
                                fullWidth
                                label="Référence"
                                classes={{ root: classes.textfield }}
                                value={this.props.reglement.banque_numero || ""}
                                onChange={event => {
                                    this.props.onUpdateReglement({
                                        ...this.props.reglement,
                                        banque_numero: event.target.value
                                    })
                                }}
                            />
                        </Grid>
                    }
                    {(this.props.reglement.type=="cheque") &&
                        <Grid item md={6} xs={12}>
                            <TextField 
                                fullWidth
                                label="Banque"
                                classes={{ root: classes.textfield }}
                                value={this.props.reglement.banque || ""}
                                onChange={event => {
                                    this.props.onUpdateReglement({
                                        ...this.props.reglement,
                                        banque: event.target.value
                                    })
                                }}
                            />
                        </Grid>
                    }
                </Grid>
            </Paper>
        )
    }
})