import * as chance from "Chance";
import Phone from "./Phone";
import Postal from "./Postal";
import City from "./City";


const _chance = new chance();
window["chance"] = _chance;
_chance.phone = Phone;
_chance.postal = Postal;
_chance.city = City;
export default _chance;