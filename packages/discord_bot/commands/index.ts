export { d } from "./d";
export * from "./pnj";
export * from "./grimoire";
export * from "./help";
export * from "./merci";
export * from "./no";
export * from "./not_cool";

export interface ICommand extends Function {
  critical?: boolean;
}
