import * as React from "react"
import { session } from "../../Datas";
import * as moment from "moment";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";

type props = {
    session: session
} & TypographyProps

export default (props: props) => {
    const { session, ...typoProps } = props;
    let _formatJour = "dddd";
    let _formatStart = "HH:mm";
    let _formatEnd = "HH:mm"
    return (
        <Typography {...typoProps}>
            {moment().day(session.jour).format(_formatJour)} de {moment().startOf("day").add(moment.duration(session.debut)).format(_formatStart)} à {moment().startOf("day").add(moment.duration(session.fin)).format(_formatEnd)} ({session.lieu.nom})
        </Typography>
    )
}