export * from "./addPnj";
export * from "./getPnj";
export * from "./listPnj";
export * from "./removePnj";
export * from "./updatePnj";

export interface IAction extends Function {
  mjRequired?: boolean;
}
