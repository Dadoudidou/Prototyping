import * as React from "react"
import store, { injectReducer } from "./Store";
import DatasReducer, { datasState, DatasActions } from "./DatasReducer";
import { connect, } from "react-redux";
import { Store } from "redux";

type IDataReducer = { DatasReducer: datasState }


type WrapConnectPublicChildrenProps<T=any> = {
    data: T
    update: (data: T) => void
    store: Store
}

type WrapConnectPublicProps<T=any, N=string> = {
    name: N
    children: (props: WrapConnectPublicChildrenProps<T>) => JSX.Element | null | false
}

type WrapConnectProps = {
    data: any
}

class WrapSession<T,N=string> extends React.Component<WrapConnectProps & WrapConnectPublicProps<T,N>, any>
{
    render(){
        return this.props.children({ 
            data: this.props.data,
            update: (data) => {
                store.dispatch(DatasActions.set({
                    key: this.props.name,
                    value: data
                } as any))
            },
            store: store
        });
    }
}

export default class DataConnect<T = any,N=string> extends React.Component<WrapConnectPublicProps<T,N>, any>
{
    static ofType<P,Q=string>(){
        return DataConnect as React.ComponentClass<WrapConnectPublicProps<P,Q>>;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.name != nextProps.name) return true;
        return false;
    }

    render(){
        var ConnectComponent = connect(
            (state: IDataReducer, props: WrapConnectPublicProps): WrapConnectProps => ({
                data: state.DatasReducer[props.name]
            })
        )(WrapSession) as any
        return (
            <ConnectComponent {...this.props} store={store} />
        )
    }
}


// export const ConfigurationSession  = DataConnect.ofType<ConfigurationApplication, "configuration">()