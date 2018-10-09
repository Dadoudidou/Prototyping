import Chance from "./index"

export default () => {
    let _tab = ["06"];
    for(let i=0; i<4; i++){
        _tab.push( Chance.integer({min:0,max:9}).toString() + Chance.integer({min:0,max:9}).toString() );
    }
    return _tab.join(" ");
}