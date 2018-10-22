import * as moment from "moment"
import Chance from "../System/Framer/Utils/Chance";
import DataConnect from "../System/Framer/Datas/DataConnect";
import store from "../System/Framer/Datas/Store";
import { DatasActions } from "../System/Framer/Datas/DatasReducer";

const datas = {};

//#region ADHERENTS
export type adherent = Partial<{
    id: number,
    nom: string, prenom: string, dateNaissance: moment.Moment, sexe?: number,
    telephone: string, adresse: string, codepostal: string, ville: string,
    email?: string
}>
const adherents: adherent[] = [];
for(let i=1; i<=50; i++){
    let _city = Chance.city();
    adherents.push({
        id: i,
        nom: Chance.last(),
        prenom: Chance.first(),
        dateNaissance: moment(Chance.birthday()),
        telephone: Chance.phone(),
        adresse: Chance.address(),
        codepostal: _city.postalCode,
        ville: _city.city
    })
}
//#endregion


//#region ACTIVITES
type activite = {
    id: number
    section: string
    categorie: string
    activite: string
    sessions: {
        jour: 1 | 2 | 3 | 4 | 5 | 6 | 0,
        debut: string
        fin: string
        place?: number
        lieu: {
            nom: string
        }
    }[]
}
const P1 = { nom: "Centre Nautique" };
const P2 = { nom: "Piscine des Gibjoncs" };
const activites: activite[] = [
    { id: 1, categorie: "Bénévoles", activite: "Bureau", section: "Président", sessions: []  },
    { id: 2, categorie: "Bénévoles", activite: "Bureau", section: "Trésorier", sessions: []  },
    { id: 3, categorie: "Bénévoles", activite: "Bureau", section: "Secrétaire", sessions: []  },
    { id: 4, categorie: "Bénévoles", activite: "Bureau", section: "Membre", sessions: []  },
    { id: 5, categorie: "Bénévoles", activite: "Encadrant", section: "Encadrant", sessions: []  },
    { id: 6, categorie: "Compétition", activite: "Natation", section: "Minime", sessions: []  },
    { id: 7, categorie: "Compétition", activite: "Natation", section: "Cadet", sessions: []  },
    { id: 8, categorie: "Compétition", activite: "Natation", section: "Elite", sessions: []  },
    { id: 9, categorie: "Compétition", activite: "Natation", section: "Creps", sessions: []  },
    { id:10, categorie: "Compétition", activite: "Water-Polo", section: "Water-Polo", sessions: [
        { jour: 2, debut: "20:15:00", fin: "21:30:00", lieu: P1 },
        { jour: 4, debut: "20:00:00", fin: "21:30:00", lieu: P1 },
    ]  },
    { id:11, categorie: "Loisir", activite: "Natation", section: "Adolescent", sessions: []  },
    { id:12, categorie: "Loisir", activite: "Natation", section: "Adulte", sessions: []  },
    { id:13, categorie: "Loisir", activite: "Aquaforme", section: "Aquagym", sessions: [
        { jour: 1, debut: "12:00:00", fin: "12:45:00", place: 10, lieu: P1 },
        { jour: 1, debut: "12:45:00", fin: "13:30:00", place: 10, lieu: P1 },
        { jour: 1, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { jour: 2, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { jour: 3, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { jour: 4, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { jour: 5, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
    ]  },
    { id:14, categorie: "Loisir", activite: "Aquaforme", section: "Aquapalming", sessions: []  },
]
//#endregion


//#region CAMPAGNES
type campagne = {
    id: number
    nom: string
}
const campagnes: campagne[] = [
    { id: 1, nom: "Saison 2017-2018" },
    { id: 2, nom: "Saison 2018-2019" }
]
//#endregion


//#region INSCRIPTION EXPRESS

export type IExpress = {
    adherents: adherent[]
    Step1_adherentSelected: number
}
const iexpress: IExpress = {
    adherents: [],
    Step1_adherentSelected: -1
}

//#endregion


export const init = () => {
    store.dispatch(DatasActions.set({ key: "adherents", value: adherents }));
    store.dispatch(DatasActions.set({ key: "campagnes", value: campagnes }));
    store.dispatch(DatasActions.set({ key: "activites", value: activites }));
    store.dispatch(DatasActions.set({ key: "iexpress", value: iexpress }));
}

export const DatasAdherents = DataConnect.ofType<adherent[], "adherents">();
export const DatasCampagnes = DataConnect.ofType<campagne[], "campagnes">();
export const DatasActivites = DataConnect.ofType<activite[], "activites">();




export default {
    adherents: () => store.getState().DatasReducer["adherents"] as adherent[],
    campagnes: campagnes,
    activites: store.getState().DatasReducer["activites"],
    iexpress: store.getState().DatasReducer["iexpress"] as IExpress
}