import * as React from "react"
import { TextField, MenuItem, Typography, Paper, StyleRulesCallback, withStyles, WithStyles, WithTheme } from "@material-ui/core"
import Select, * as ReactSelect from "react-select"
import Datas, { adherent } from "../../../Datas";
import { TextFieldProps } from "@material-ui/core/TextField";

type props = {
    value?: string
    onChange?: (adherent: adherent) => void
    options?: any[]
    filterOption?: (data: any, search: string) => boolean
    formatOption?: (data: any) => string

    placeHolder?: string
    ControlProps?: TextFieldProps
}
type state = {}


const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
}

const Control = (options?: TextFieldProps) => (props: any) => {
    return (
        <TextField
            {...options}
            fullWidth
            InputProps={{
                inputComponent,
                ...(options ? options.InputProps : undefined),
                inputProps: {
                    inputRef: props.innerRef,
                    children: props.children,
                    style:{ display: "flex" },
                    ...props.innerProps
                }
            }}
        />
    )
}

const Option = (props) => {
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

const Placeholder = (props) => {
    return (
        <Typography
            color="textSecondary"
            style={{
                position: 'absolute',
                left: 16,
                fontSize: 16,
            }}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

const Menu = (props) => {
    return (
        <Paper square {...props.innerProps} style={{
            position: 'absolute',
            zIndex: 1,
            marginTop: 8,
            left: 0,
            right: 0
        }}>
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


export default class extends React.PureComponent<props, state>
{
    handle_onChange = (data) => {
        if(this.props.onChange) this.props.onChange(data);
    }
    render() {
        return (
            <div>
                <Select
                    options={Datas.adherents}
                    filterOption={filterOption}
                    formatOptionLabel={formatOptionLabel}
                    placeholder={this.props.placeHolder}
                    components={{
                        Control: Control(this.props.ControlProps),
                        Menu,
                        Placeholder,
                        Option
                    }}
                    inputValue={this.props.value}
                    onChange={this.handle_onChange}
                />
            </div>
        )
    }
}