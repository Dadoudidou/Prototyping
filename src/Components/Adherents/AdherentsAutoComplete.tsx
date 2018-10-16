import * as React from "react";
import AutoComplete from "../../System/Framer/Components/AutoComplete";
import { Option } from "react-select/lib/filters";
import Datas, { DatasAdherents, adherent } from "../../Datas";
import { TextFieldProps } from "@material-ui/core/TextField";
import AutoSuggest from "../../System/Framer/Components/AutoSuggest";

type props = {
    onSelect?: (item: adherent) => void
} & TextFieldProps

export default class extends React.PureComponent<props, any>
{
    
    render(){
        const { value, onSelect, onChange, ...rest } = this.props;
        return (
            <AutoSuggest 
                items={Datas.adherents()}
                onClearRequested={() => {}}
                onFetchRequested={() => {}}
                renderItem={(item) => (<div>{item.nom} {item.prenom} - {item.ville}</div>)}
                renderItemValue={(item) => item.nom}
                onSelect={onSelect}
                InputValue={value as string}
                onInputChange={onChange}
                TextFieldProps={rest}
                matchItem={(item: adherent, query) => {
                    return item.nom.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                    item.prenom.toLowerCase().indexOf(query.toLowerCase()) > -1
                }}
                
            />
        )
    }
}