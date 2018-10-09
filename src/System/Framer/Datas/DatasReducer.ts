import { actionCreator, IAction, isType } from "./Utils/ReduxAction";

const actionType = "Framer/Datas/";
type KeyValue = { key: string, value: any }
export const DatasActions = {
    set: actionCreator<KeyValue>(`${actionType}set`),
    clear: actionCreator(`${actionType}clear`)
};

export type datasState = { [key: string]: any }
const initialState = { }

export default (state: datasState = initialState, action: IAction<any>): datasState => {

    if(isType(action, DatasActions.set)){
        return {
            ...state,
            [action.payload.key]: action.payload.value
        }
    }

    if(isType(action, DatasActions.clear)){
        return initialState;
    }

    return state;
}
