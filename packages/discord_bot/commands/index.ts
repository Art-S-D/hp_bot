export { d } from "./d";
export * from "./pnj";
export * from "./help";
export * from "./merci";
export * from "./no";
export * from "./not_cool";
export * from "./jeux";
export * from "./grimoire";

export interface ICommand extends Function {
    critical?: boolean;
}
