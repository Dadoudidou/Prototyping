import Chance from "./index"
export default () => Chance.integer({min:10000, max:98000}).toString()