import * as React from "react"
import AutoComplete from "../../../System/Framer/Components/AutoComplete";
import { Option } from "react-select/lib/filters";
import Datas, { DatasAdherents, DatasActivites } from "../../../Datas";
import { Chip, Typography } from "@material-ui/core";

type props = {
    onClose?: () => void
}
type state = {}

export default class extends React.PureComponent<props, state>
{
    filterOption = (data: Option, search: string) => {
        if(!search) return true;
        let _bool = false;
        if(data.data.prenom){
            let _nom = data.data.nom.toLowerCase().indexOf(search.toLowerCase()) > -1;
            let _prenom = data.data.prenom.toLowerCase().indexOf(search.toLowerCase()) > -1;
            _bool = _nom || _prenom
        }
        if(data.data.activite){
            let _activite = data.data.activite.toLowerCase().indexOf(search.toLowerCase()) > -1;
            let _section = data.data.section.toLowerCase().indexOf(search.toLowerCase()) > -1;
            _bool = _section
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
                <Chip label="Adhérent" style={{ ..._styles, background: "#3F51B5"}} />
                {data.nom} {data.prenom} - {data.telephone}
            </div>);
        if(data.activite) 
            return (<div>
                <Chip label="Activité"  style={{ ..._styles, background: "#673AB7"}} />
                {data.section} - {data.categorie} / {data.activite}
            </div>);
        
        return (<div></div>)
    }
    render(){
        return (
            <DatasAdherents name="adherents">
                {(adherents) => (
                    <DatasActivites name="activites">
                        {(activites) => (
                            <AutoComplete 
                                autoFocus
                                filterOption={this.filterOption}
                                formatOptionLabel={this.formatOptionLabel}
                                placeholder="Rechercher..."
                                options={[
                                    ...adherents.data,
                                    ...activites.data
                                ]}
                                styles={{
                                    singleValue: (base) => ({ ...base, color: "white" }),
                                    placeholder: (base) => ({ ...base, color: "white" }),
                                    valueContainer: (base) => ({ ...base, color: "white" }),
                                    control: (base) => ({ ...base, color: "white" }),
                                    indicatorsContainer: (base) => ({ ...base, display: "none" }),
                                    indicatorSeparator: (base) => ({ ...base, display: "none" })
                                }}
                                ControlProps={{ 
                                    InputProps: { disableUnderline: true } 
                                }}
                                onBlur={this.props.onClose}
                            />
                        )}
                    </DatasActivites>
                )}
            </DatasAdherents>
        )
    }
}