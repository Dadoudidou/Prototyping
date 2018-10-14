import * as React from "react";
import AutoComplete from "../../System/Framer/Components/AutoComplete";
import { Option } from "react-select/lib/filters";
import { DatasAdherents } from "../../Datas";
import { TextFieldProps } from "@material-ui/core/TextField";

type props = {
    onAutoCompleteChange?: (data: any) => void
} & TextFieldProps

export default class extends React.PureComponent<props, any>
{
    filterOption = (data: Option, search: string) => {
        if(!search) return true;
        let _bool = false;
        if(data.data.prenom){
            let _nom = data.data.nom.toLowerCase().indexOf(search.toLowerCase()) > -1;
            let _prenom = data.data.prenom.toLowerCase().indexOf(search.toLowerCase()) > -1;
            _bool = _nom || _prenom
        }
        return _bool;
    }
    formatOptionLabel = (data: any) => {
        let _styles: React.CSSProperties = {
            height: "2em",
            color: "#ffffff",
            fontSize: "0.8em",
            marginRight: "2em"
        }
        if(data.prenom) 
            return (<div>
                {data.nom} {data.prenom} - {data.telephone}
            </div>);
        
        return (<div></div>)
    }
    render(){
        const {  onAutoCompleteChange, ...rest } = this.props;
        return (
            <DatasAdherents name="adherents">
                {(datasAdherents) => (
                    <AutoComplete 
                        filterOption={this.filterOption}
                        formatOptionLabel={this.formatOptionLabel}
                        placeholder=""
                        ControlProps={rest}
                        options={datasAdherents.data}
                        //inputValue={value as string}
                        onChange={onAutoCompleteChange}
                    />
                )}
            
            </DatasAdherents>
        )
    }
}