import * as React from "react";
import Datas, { DatasAdherents, adherent } from "../../Datas";
import { TextFieldProps } from "@material-ui/core/TextField";
import AutoSuggest from "../../System/Framer/Components/AutoSuggest";

const Villes: {city: string, postalcode:string}[] = require("./../../System/Framer/Utils/Chance/cher.json")

type props = {
    onSelect?: (item: {city: string, postalcode:string}) => void
} & TextFieldProps

export default class extends React.PureComponent<props, any>
{
    
    render(){
        const { value, onSelect, onChange, ...rest } = this.props;
        return (
            <AutoSuggest 
                items={Villes}
                onClearRequested={() => {}}
                onFetchRequested={() => {}}
                renderItem={(item) => (<div>{item.city} - {item.postalcode}</div>)}
                renderItemValue={(item) => `${item.city} -  ${item.postalcode}`}
                onSelect={onSelect}
                InputValue={value as string}
                onInputChange={onChange}
                TextFieldProps={rest}
                matchItem={(item, query) => {
                    let _city = false;
                    let _postalCode = false;
                    if(item && item.city) _city = item.city.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    if(item && item.postalcode) _postalCode = item.postalcode.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    return _city || _postalCode;
                }}
                
            />
        )
    }
}