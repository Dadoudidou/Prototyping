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
export type session = {
    id: number
    jour: 1 | 2 | 3 | 4 | 5 | 6 | 0,
    debut: string
    fin: string
    place?: number
    lieu: {
        nom: string
    }
}
export type tarif = {
    id: number
    montant: number
    dateDebut?: Date
    dateFin?: Date
    nbSessions?: number
}
export type activite = {
    id: number
    section: string
    categorie: string
    activite: string
    sessions: session[]
    tarifs?: tarif[]
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
        { id:1, jour: 2, debut: "20:15:00", fin: "21:30:00", lieu: P1 },
        { id:2, jour: 4, debut: "20:00:00", fin: "21:30:00", lieu: P1 },
    ], tarifs: [
        { id: 1, montant: 220 }
    ]},
    { id:11, categorie: "Loisir", activite: "Natation", section: "Adolescent", sessions: []  },
    { id:12, categorie: "Loisir", activite: "Natation", section: "Adulte", sessions: []  },
    { id:13, categorie: "Loisir", activite: "Aquaforme", section: "Aquagym", sessions: [
        { id:3, jour: 1, debut: "12:00:00", fin: "12:45:00", place: 10, lieu: P1 },
        { id:4, jour: 1, debut: "12:45:00", fin: "13:30:00", place: 10, lieu: P1 },
        { id:5, jour: 1, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { id:6, jour: 2, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { id:7, jour: 3, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { id:8, jour: 4, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
        { id:9, jour: 5, debut: "20:00:00", fin: "20:45:00", place: 10, lieu: P2 },
    ], tarifs: [
        { id: 2, montant: 90, dateDebut: new Date("2018-09-01"), dateFin: new Date("2018-12-31"), nbSessions:1 },
        { id: 3, montant: 180, dateDebut: new Date("2018-09-01"), dateFin: new Date("2018-12-31"), nbSessions:2 },
        { id: 4, montant: 80, dateDebut: new Date("2019-01-01"), dateFin: new Date("2019-03-31"), nbSessions:1 },
        { id: 5, montant: 160, dateDebut: new Date("2019-01-01"), dateFin: new Date("2019-03-31"), nbSessions:2 },
        { id: 6, montant: 80, dateDebut: new Date("2019-04-01"), dateFin: new Date("2019-06-30"), nbSessions:1 },
        { id: 7, montant: 160, dateDebut: new Date("2018-04-01"), dateFin: new Date("2019-06-31"), nbSessions:2 },
    ]},
    { id:14, categorie: "Loisir", activite: "Aquaforme", section: "Aquapalming", sessions: []  },
]
//#endregion


//#region CAMPAGNES
export type campagne = {
    id: number
    nom: string
}
const campagnes: campagne[] = [
    { id: 1, nom: "Saison 2017-2018" },
    { id: 2, nom: "Saison 2018-2019" }
]
//#endregion

//#region FACTURES
export type facture = {
    id: number
    elements: factureElement[]
    reglements?: factureReglement[]
}
export type factureElement = {
    id: number
    nom: string
    adherent?: adherent
    description?: React.ReactNode
    detail?: React.ReactNode
    montant: number
}
export type factureReglement = {
    id: number
    montant: number
    date: Date
    type: string
    banque?: string
    banque_numero?:string
}
//#endregion

//#region INSCRIPTION EXPRESS

export type IExpress = {
    adherents: adherent[]
    Step1_adherentSelected: number
    adhesions: adhesion[]
    equipements: equipement[]
    facture: facture
}
const iexpress: IExpress = {
    adherents: [],
    Step1_adherentSelected: -1,
    adhesions: [],
    equipements: [],
    facture: undefined
}

//#endregion

//#region EQUIPEMENTS
export type equipement = {
    id: number
    nom: string
    description?: string
    montant?: number
    montantDescription?: string
    adherent: adherent
    campagne: campagne
}
const equipements: equipement[] = []

//#endregion

//#region ADHESIONS

export type adhesion = {
    id: number
    adherent: adherent,
    activite: activite,
    campagne: campagne,
    sessions?: session[]
    tarif?: tarif
    valide?: boolean
}
const adhesions: adhesion[] = [];
for(let i=0; i<10; i++){
    let _activiteIndex = Math.floor(Math.random() * Math.floor(activites.length));
    adhesions.push({
        id: i,
        adherent: adherents[Math.floor(Math.random() * Math.floor(adherents.length))],
        activite: activites[_activiteIndex],
        campagne: campagnes[Math.floor(Math.random() * Math.floor(campagnes.length))],
        tarif: activites[_activiteIndex].tarifs ? activites[_activiteIndex].tarifs[0]: undefined,
        valide: true
    })
}

//#endregion



//#region TEST
adherents.push({
    id:9999,
    nom: "Violet",
    prenom: "David",
    dateNaissance: moment("1984-11-29"),
    telephone: "06 02 09 64 52",
    adresse: "15 route du clos de Lizy",
    codepostal: "18110",
    ville: "Pigny",
    email: "davidviolet18@gmail.com",
    sexe: 0
})
adhesions.push({ id: 9998, adherent: adherents[adherents.length - 1], campagne: campagnes[0], activite: activites[4], valide: true })
adhesions.push({ id: 9999, adherent: adherents[adherents.length - 1], campagne: campagnes[0], activite: activites[9], valide: true })
//adhesions.push({ id: 9997, adherent: adherents[adherents.length - 1], campagne: campagnes[1], activite: activites[9], valide: false })
//#endregion

export const init = () => {
    store.dispatch(DatasActions.set({ key: "adherents", value: adherents }));
    store.dispatch(DatasActions.set({ key: "campagnes", value: campagnes }));
    store.dispatch(DatasActions.set({ key: "activites", value: activites }));
    store.dispatch(DatasActions.set({ key: "iexpress", value: iexpress }));
    store.dispatch(DatasActions.set({ key: "adhesions", value: adhesions }));
    store.dispatch(DatasActions.set({ key: "equipements", value: equipements }));
}

export const DatasAdherents = DataConnect.ofType<adherent[], "adherents">();
export const DatasCampagnes = DataConnect.ofType<campagne[], "campagnes">();
export const DatasActivites = DataConnect.ofType<activite[], "activites">();
export const DatasAdhesions = DataConnect.ofType<adhesion[], "adhesions">();
export const DatasEquipements = DataConnect.ofType<equipement[], "equipements">();



export default {
    adherents: () => store.getState().DatasReducer["adherents"] as adherent[],
    campagnes: campagnes,
    activites: store.getState().DatasReducer["activites"],
    iexpress: store.getState().DatasReducer["iexpress"] as IExpress,
    adhesions: store.getState().DatasReducer["adhesions"] as adhesion[],
    equipements: store.getState().DatasReducer["equipements"] as equipement[]
}