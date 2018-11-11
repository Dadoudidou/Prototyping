import * as React from "react"
import { activite } from "../../Datas";
import { ListItem, Typography } from "@material-ui/core";

type props = {
    activite: activite
    showSection?: boolean
    showCategorie?: boolean
}

export default class Activite extends React.PureComponent<props, any>{
    static defaultProps: Partial<props> = {
        showSection: true,
        showCategorie: true
    }
    render(){
        const props = this.props;
        return (
            <div style={{display: "flex"}}>
                <div style={{flexGrow:1}}>
                    {props.showSection && <Typography>{props.activite.section}</Typography>}
                    {props.showCategorie && <Typography variant="caption">{props.activite.categorie}/{props.activite.activite}</Typography>}
                </div>
            </div>
        )
    }
}