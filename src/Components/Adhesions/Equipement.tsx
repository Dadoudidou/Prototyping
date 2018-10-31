import * as React from "react"
import { adhesion, equipement } from "../../Datas";
import { Typography, Button, StyleRulesCallback, WithStyles, withStyles } from "@material-ui/core";

type classkey = "root" | "labelButton" | "disabledButton"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        textTransform:"inherit", 
        textAlign:"inherit", 
        justifyContent:"start",
        alignItems:"start"
    },
    labelButton: {
        flexDirection: "row",
        justifyContent:"start",
        alignItems:"start",
        display: "flex"
    },
    disabledButton: {
        opacity: 0.5
    }
})

type props = {
    equipement: equipement
    disableValide?: boolean
    button?: boolean
    onClick?: () => void
}

export default withStyles(styles)((props: props & WithStyles<classkey>) => {
    return (
        <Button 
            fullWidth 
            style={{alignItems: "start"}}
            className={props.classes.root}
            classes={{
                //root: props.classes.root,
                //label: props.classes.labelButton,
                //disabled: props.classes.disabledButton
            }}
            variant="flat"
            onClick={props.onClick}
        >
            <div style={{display: "block", width: 64, height: 64, background:"#ccc"}}>

            </div>
            <div style={{display:"flex", flexDirection: "column", alignSelf: "center", paddingLeft: "1em"}}>
                <div>
                    <Typography>{props.equipement.nom}</Typography>
                </div>
                <div>
                    <Typography variant="caption">{props.equipement.montantDescription}</Typography>
                </div>
            </div>
        </Button>
    )
})