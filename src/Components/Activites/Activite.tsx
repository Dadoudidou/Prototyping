import * as React from "react"
import { activite } from "../../Datas";
import { ListItem, Typography } from "@material-ui/core";

type props = {
    activite: activite
}

export default (props: props) => {
    return (
        <div style={{display: "flex"}}>
            <div style={{flexGrow:1}}>
                <Typography>{props.activite.section}</Typography>
                <Typography variant="caption">{props.activite.categorie}/{props.activite.activite}</Typography>
            </div>
        </div>
    )
}