import { adherent, adhesion, facture, equipement, factureReglement } from "../../Datas";
import Adhesion from "../Adhesions/Adhesion";
import Activite from "../Activites/Activite";
import Session from "../Activites/Session";
import Tarif from "../Activites/Tarif";
import * as React from "react";
import { Typography } from "@material-ui/core";
import * as moment from "moment"


function groupBy<T>(list: T[], keyGetter: (p:T) => any): Map<any, T[]> {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export const totalFacture = (facture: facture) => {
    let _total = 0;
    facture.elements.forEach(x => _total+=x.montant);
    return _total;
}

export const generateReglement = (nb, total) => {
    let _ret:factureReglement[] = [];

        let _sum = total;
        let _step = Math.floor(_sum / nb);
        let _res = _sum;
        for(let i=0; i<nb; i++){
            let _montant = _step;
            if(i==nb-1){
                _montant = _sum - ((nb-1) * _step);
            }
            _ret.push({
                id: i,
                montant: _montant,
                date: moment().add(i, "month").toDate(),
                type: "cheque"
            })
        }
        return _ret;
}

export const generateFacture = (adhesions: adhesion[], equipements: equipement[]) => {
    console.log(adhesions);
    let _facture: facture = {
        id: 1,
        elements: []
    };
    let _elementId = 1;
    const groupByAdherent = groupBy(adhesions, adhesion => adhesion.adherent.id);
    groupByAdherent.forEach((_adhesions, adherentId) => {
        let _equipements = equipements.filter(x => x.adherent.id == adherentId);
        _adhesions.forEach(adhesion => {
            _facture.elements.push({
                id: _elementId,
                adherent: adhesion.adherent,
                nom: `${adhesion.adherent.prenom} - ${adhesion.activite.section}`,
                montant: adhesion.tarif.montant,
                description: <div>
                    {adhesion.sessions.map((x,i) => (
                        <Session session={x} key={i} variant="caption" />
                    ))}
                    <Tarif hideMontant={true} lines={2} tarif={adhesion.tarif} variant="caption" />
                </div>,
                detail: <Activite activite={adhesion.activite} showSection={false} />
            })
            _elementId++;
        });
        _equipements.forEach(equipement => {
            _facture.elements.push({
                id: _elementId,
                adherent: equipement.adherent,
                nom: `${equipement.adherent.prenom} - ${equipement.nom}`,
                montant: equipement.montant,
                description: equipement.description,
                detail: <Typography variant="caption">{equipement.montantDescription}</Typography>
            })
            _elementId++;
        })
    });



    // -- generation d'un reglement
    _facture.reglements = generateReglement(1, totalFacture(_facture))
    return _facture;
}