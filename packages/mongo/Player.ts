import { Schema, model, Model, Document } from "mongoose";

export interface IPlayer extends Document {
    name: string;
    privateChannel: string;
    stats: {
        esprit: number;
        coeur: number;
        corps: number;
        magie: number;
    };
    competences: {
        bluff: number;
        farce: number;
        tactique: number;
        rumeur: number;
        bagarre: number;
        endurance: number;
        perception: number;
        precision: number;
        decorum: number;
        discretion: number;
        persuasion: number;
        romance: number;
    };
    matieres: {
        astronomie: number;
        botanique: number;
        dcfm: number;
        enchantement: number;
        histoire: number;
        metamorphose: number;
        potions: number;
        vol: number;
        alchimie: number;
        arithmancie: number;
        divination: number;
        duel: number;
        emoldu: number;
        runes: number;
        scam: number;
    };
    jeux: {
        echecs: number;
        bavboules: number;
        cartes: number;
    };
    getStat(stat: string): number | undefined;
}

export interface IPlayerModel extends Model<IPlayer> {
    getPlayerFromRole(msg: any): Promise<IPlayer>;
}

const statType = {
    type: Number,
    required: true,
};

const PlayerSchema = new Schema({
    name: { type: String, required: true, index: true, unique: true },
    privateChannel: String,
    stats: {
        esprit: statType,
        coeur: statType,
        corps: statType,
        magie: statType,
    },
    competences: {
        bluff: statType,
        farce: statType,
        tactique: statType,
        rumeur: statType,
        bagarre: statType,
        endurance: statType,
        perception: statType,
        precision: statType,
        decorum: statType,
        discretion: statType,
        persuasion: statType,
        romance: statType,
    },
    matieres: {
        astronomie: statType,
        botanique: statType,
        dcfm: statType,
        enchantement: statType,
        histoire: statType,
        metamorphose: statType,
        potions: statType,
        vol: statType,
        alchimie: statType,
        arithmancie: statType,
        divination: statType,
        duel: statType,
        emoldu: statType,
        runes: statType,
        sacm: statType,
    },
    jeux: {
        echecs: statType,
        bavboules: statType,
        cartes: statType,
    },
});

PlayerSchema.methods.getStat = function (this: IPlayer, stat: string): number | undefined {
    const res = this.stats[stat] ?? this.competences[stat] ?? this.matieres[stat];
    if (res == undefined) throw new Error(`stat inconnue ${stat}`);
    return res;
};

// import { Card, CardCategory } from "./Card";
// PlayerSchema.methods.addCardByCategory = async function (category: CardCategory) {
//     if (category !== "C" && category !== "R" && category !== "L") throw new Error(`wrong category ${category}`);

//     const count = await Card.find({ category }).countDocuments();

//     let card = await Card.findOne({ category }).skip(Math.floor(Math.random() * count));
//     if (!card) throw new Error(`Aucune carte trouvée`);

//     if (!this.cards.items) this.cards.items = [];
//     this.cards.items.push(card._id);
//     this.markModified("inventory");
//     await this.save();
// };

PlayerSchema.statics.getPlayerFromRole = async function (this: any, msg: any): Promise<IPlayer | null> {
    return await this.findOne({
        name: { $in: msg.member.roles.cache.map((r) => r.name) },
    });
};

export const Player = model<IPlayer, IPlayerModel>("Player", PlayerSchema);
