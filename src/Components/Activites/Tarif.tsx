import * as React from "react"
import { tarif } from "../../Datas";
import * as moment from "moment";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";

type props = {
    tarif: tarif
    lines?: 1 | 2 | 3
    hideMontant?: boolean
} & TypographyProps

export default (props: props) => {
    const { tarif, lines, hideMontant, ...typoProps } = props;

    if(!tarif) return null;

    let _lines = lines | 1;
    let ret = [];
    let ret2 = [];
    let ret3 = [];

    if(!hideMontant) ret.push(tarif.montant + " €");

    //if (tarif.is_card) {
        //ret.push("Carte de " + order.card_nb_session + " session" + (order.card_nb_session > 1 ? "s" : ""));
    //} else {
        if (!tarif.nbSessions) {
            if(_lines == 1) ret.push("Toutes sessions");
            else ret2.push("Toutes sessions")
        } else {
            //if (order.restriction_session_max == order.restriction_session_min) {
                if(_lines == 1) ret.push(tarif.nbSessions + " session" + (tarif.nbSessions > 1 ? "s" : ""));
                else ret2.push(tarif.nbSessions + " session" + (tarif.nbSessions > 1 ? "s" : ""))
            //} else {
              //  ret.push("de " + order.restriction_session_min + " à " + order.restriction_session_max + " sessions");
            //}
        }
    //}

    if(tarif.dateDebut && tarif.dateFin)
        if(_lines == 1) ret.push("du " + moment(tarif.dateDebut).format("ll") + " au " + moment(tarif.dateFin).format("ll"));
        else if(_lines == 2) ret2.push("du " + moment(tarif.dateDebut).format("ll") + " au " + moment(tarif.dateFin).format("ll"))
        else ret3.push("du " + moment(tarif.dateDebut).format("ll") + " au " + moment(tarif.dateFin).format("ll"));

    //return ret.join(" - ");

    return (
        <Typography {...typoProps}>
            {ret.join(" - ")}
            {ret2.length > 0 && ret.length > 0 && <br />}
            {ret2.join(" - ")}
            {ret3.length > 0 && <br />}
            {ret3.join(" - ")}
        </Typography>
    )
}