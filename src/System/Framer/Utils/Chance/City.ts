import Chance from "./index"
const CityCher = require("./cher.json");

export default (): { city:string, postalcode:string } => {

    let _index = parseInt( (Math.random() * CityCher.length).toFixed() )
    return CityCher[_index];
}