export type Bonus = number | string;

export interface Id20 {
  bonus1?: Bonus;
  bonus2?: Bonus;
  reroll?: Bonus;
  diff: Bonus;
}
