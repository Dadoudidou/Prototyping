import * as chance from "Chance";
import Phone from "./Phone";
import Postal from "./Postal";


const _chance = new chance();
window["chance"] = _chance;
_chance.phone = Phone;
_chance.postal = Postal;
export default _chance;