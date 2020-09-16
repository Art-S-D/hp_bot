import { Message } from "discord.js";
import {
  IAction,
  addPnj,
  getPnj,
  listPnj,
  removePnj,
  updatePnj,
} from "./subcommands";
import parser = require("./parser.js");
import hasRole from "../../utils/hasRole";

//FOR REFERENCE
const _pnjAction = {
  get: 1,
  update: 2,
  remove: 3,
  add: 4,
  list: 5,
};

const pnjActions = [getPnj, updatePnj, removePnj, addPnj, listPnj];

export async function pnj(msg: Message) {
  try {
    const pnjAst = parser.parse(msg.content);
    const action: IAction = pnjActions[pnjAst.type - 1];

    if (action.mjRequired && !hasRole(msg, "Esprit de Poudlard")) {
      msg.reply("Vous devez être MJ pour effectuer cette action.");
      return;
    }
    await action(msg, pnjAst);
  } catch (e) {
    throw e;
  }
}

pnj.critical = true;
