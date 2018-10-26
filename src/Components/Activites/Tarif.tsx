import * as React from "react"
import { tarif } from "../../Datas";
import * as moment from "moment";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";

type props = {
    tarif: tarif
} & TypographyProps

export default (props: props) => {
    const { tarif, ...typoProps } = props;


    let ret = [];

    ret.push(tarif.montant + " €");

    //if (tarif.is_card) {
        //ret.push("Carte de " + order.card_nb_session + " session" + (order.card_nb_session > 1 ? "s" : ""));
    //} else {
        if (!tarif.nbSessions) {
            ret.push("Toutes sessions");
        } else {
            //if (order.restriction_session_max == order.restriction_session_min) {
                ret.push(tarif.nbSessions + " session" + (tarif.nbSessions > 1 ? "s" : ""));
            //} else {
              //  ret.push("de " + order.restriction_session_min + " à " + order.restriction_session_max + " sessions");
            //}
        }
    //}

    if(tarif.dateDebut && tarif.dateFin)
        ret.push("du " + moment(tarif.dateDebut).format("LL") + " au " + moment(tarif.dateFin).format("LL"));

    //return ret.join(" - ");

    return (
        <Typography {...typoProps}>
            {ret.join(" - ")}
        </Typography>
    )
}