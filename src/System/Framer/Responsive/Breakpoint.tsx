import * as React from "react"
import { withWidth } from "@material-ui/core";
import { WithWidth, isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

type props = {
    breakpoint: Breakpoint,
    up?: boolean
    down?: boolean
    children?: React.ReactNode
}

export default withWidth()((props: props & WithWidth) => {
    if(props.up && isWidthUp(props.breakpoint, props.width)) return <>{props.children}</>;
    if(props.down && isWidthDown(props.breakpoint, props.width)) return <>{props.children}</>;
    if(!props.up && !props.down && props.width == props.breakpoint) return <>{props.children}</>;
    return null;
})