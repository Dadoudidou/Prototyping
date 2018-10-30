import * as React from "react"
import { adhesion } from "../../Datas";
import { Typography, Button, StyleRulesCallback, WithStyles, withStyles } from "@material-ui/core";
import Session from "../Activites/Session";
import Activite from "../Activites/Activite";
import Tarif from "../Activites/Tarif";

type classkey = "root" | "labelButton" | "disabledButton"
const styles: StyleRulesCallback<classkey> = theme => ({
    root: {
        textTransform:"inherit", 
        textAlign:"inherit", 
        justifyContent:"start",
        alignItems:"start"
    },
    labelButton: {
        flexDirection: "column",
        justifyContent:"start",
        alignItems:"start"
    },
    disabledButton: {
        opacity: 0.5
    }
})

type props = {
    adhesion: adhesion
    disableValide?: boolean
    button?: boolean
    onClick?: () => void
}

export default withStyles(styles)((props: props & WithStyles<classkey>) => {
    let _sessions = props.adhesion.sessions || props.adhesion.activite.sessions;
    return (
        <Button 
            fullWidth 
            style={{alignItems: "start"}}
            className={props.classes.root}
            classes={{
                root: props.classes.root,
                label: props.classes.labelButton,
                disabled: props.classes.disabledButton
            }}
            disabled={props.disableValide && props.adhesion.valide}
            variant="flat"
            onClick={props.onClick}
        >
            <div>
                <Activite activite={props.adhesion.activite} />

                <div>
                {_sessions.map((x,i) => (
                    <Session session={x} key={i} variant="caption" />
                ))}
                </div>
            </div>
            <div>
                <Tarif tarif={props.adhesion.tarif} />
            </div>
        </Button>
    )
})