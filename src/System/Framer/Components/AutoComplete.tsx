import * as React from "react"
import { TextField, MenuItem, Typography, Paper, StyleRulesCallback, withStyles, WithStyles, WithTheme } from "@material-ui/core"
import Select, * as ReactSelect from "react-select"
import Datas, { adherent } from "../../../Datas";
import { TextFieldProps } from "@material-ui/core/TextField";
import { Props } from "react-select/lib/Select";
import { PaperProps } from "@material-ui/core/Paper";
import { TypographyProps } from "@material-ui/core/Typography";
import { MenuItemProps } from "@material-ui/core/MenuItem";
import * as DeepExtend from "deepextend"

type props = {
    ControlProps?: TextFieldProps
    MenuProps?: PaperProps
    PlaceHolderProps?: TypographyProps
    OptionProps?: MenuItemProps
} & Props<any>
type state = {}

type classKey = "root" | "input" | "paper" | "placeholder"
const styles: StyleRulesCallback<classKey> = theme => ({
    root: {},
    input: {
        display: "flex"
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 8,
        left: 0,
        right: 0
    },
    placeholder: {
        position: 'absolute',
        left: 16,
        fontSize: 16
    }
})

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
}

const Control = (options?: TextFieldProps) => (props: any) => {
    let _options: TextFieldProps = DeepExtend(
        {}, 
        {
            fullWidth: true,
            InputProps: {
                inputComponent,
                inputProps: {
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }
        } as TextFieldProps,
        options
    )
    return (
        <TextField
            {..._options}
        />
    )
}

const Option = (options?: MenuItemProps) => (props) => {
    let data = props.data as adherent;
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    )
}

const Placeholder = (options?: TypographyProps) => (props) => {
    return (
        <Typography
            color="inherit"
            {...options}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

const Menu = (options?: PaperProps) => (props) => {
    return (
        <Paper square {...props.innerProps} {...options}>
            {props.children}
        </Paper>
    );
}

const filterOption = (value: { data: adherent }, search: string): boolean => {
    if(!search) return true;
    if(!value.data.nom) return false;
    if(!value.data.prenom) return false;
    let _nom = value.data.nom.toLowerCase().indexOf(search.toLowerCase());
    let _prenom = value.data.prenom.toLowerCase().indexOf(search.toLowerCase());
    return (_nom > -1) || (_prenom > -1);
}

const formatOptionLabel = (data: adherent) => (
    <div>{data.nom} {data.prenom}</div>
)


export default withStyles(styles)(class extends React.PureComponent<props & WithStyles<classKey>, state>
{
    render() {
        let { classes, ControlProps, MenuProps, PlaceHolderProps, OptionProps, ...rest } = this.props;
        return (
            <div>
                <Select
                    components={{
                        Control: Control(DeepExtend({}, ControlProps, {InputProps: { inputProps: { className: classes.input }}})),
                        Menu: Menu({ ...MenuProps, className: classes.paper }),
                        Placeholder: Placeholder({ ...PlaceHolderProps, className: classes.placeholder }),
                        Option: Option({ ...OptionProps })
                    }}
                    {...rest}
                />
            </div>
        )
    }
})