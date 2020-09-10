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
  },
});

PlayerSchema.methods.getStat = function (
  this: IPlayer,
  stat: string
): number | undefined {
  const res = this.stats[stat] ?? this.competences[stat] ?? this.matieres[stat];
  if (res == undefined) throw new Error(`stat inconnue inconnue ${stat}`);
  return res;
};

PlayerSchema.statics.getPlayerFromRole = async function (
  this: any,
  msg: any
): Promise<IPlayer | null> {
  return await this.findOne({
    name: { $in: msg.member.roles.cache.array().map((r) => r.name) },
  });
};

export const Player = model<IPlayer, IPlayerModel>("Player", PlayerSchema);
