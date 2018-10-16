import * as React from "react"
import { StyleRulesCallback, WithStyles, withStyles, TextField, MenuItem, Paper } from "@material-ui/core"
import { AutosuggestProps, default as AutoSuggestComp, RenderInputComponent } from "react-autosuggest"
import { TextFieldProps } from "@material-ui/core/TextField";

type classkey = "container" | "suggestionsContainerOpen" | "suggestion" | "suggestionsList" | "menuItem"
const styles: StyleRulesCallback<classkey> = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 9,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    menuItem: {
        height: "auto"
    }
})

type props<T = any> = { 
    TextFieldProps?: TextFieldProps
    items: T[]
    renderItem: (item: T) => React.ReactNode
    renderItemValue: (item: T) => string
    onFetchRequested: (event: { value: string }) => void
    onClearRequested: () => void
    onSelect: (item: T) => void
    InputValue?: string
    onInputChange?: (event) => void
    matchItem?: (item: T, query: string) => boolean
}

class AutoSuggest extends React.PureComponent<props & WithStyles<classkey>, any>
{
    renderInputComponent: RenderInputComponent<any> = (inputProps) => {
        const { value, itemRef, ...other } = inputProps;
        return (
            <TextField 
                {...this.props.TextFieldProps}
                value={value}
                inputRef={itemRef}
                InputProps={{
                    inputProps: other as any
                }}
            />
        );
    }

    render_suggestion = (suggestion: any, { query, isHighlighted }) => {
        if(!this.props.matchItem(suggestion, query)) return null;
        return (
            <MenuItem dense selected={isHighlighted} component="div" classes={{ root: this.props.classes.menuItem }}>
                <div>
                    {this.props.renderItem(suggestion)}
                </div>
            </MenuItem>
        )
    }

    render_suggestions_container = (options) => {
        const { containerProps, children } = options;
        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    }

    render(){
        const { classes} = this.props;
        return (
            <AutoSuggestComp 
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={this.renderInputComponent}
                suggestions={this.props.items}
                onSuggestionsFetchRequested={this.props.onFetchRequested}
                onSuggestionsClearRequested={this.props.onClearRequested}
                renderSuggestionsContainer={this.render_suggestions_container}
                getSuggestionValue={this.props.renderItemValue}
                renderSuggestion={this.render_suggestion}
                onSuggestionSelected={(event, data) => { this.props.onSelect(data.suggestion); }}
                inputProps={{
                    value: this.props.InputValue || '',
                    onChange: this.props.onInputChange
                }}
                focusInputOnSuggestionClick={true}
            />
        )
    }
}

export default withStyles(styles)(AutoSuggest);