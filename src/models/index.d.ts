import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Expense {
  readonly id: string;
  readonly createdAt: number;
  readonly description: string;
  readonly amount: number;
  readonly note?: string;
  constructor(init: ModelInit<Expense>);
  static copyOf(source: Expense, mutator: (draft: MutableModel<Expense>) => MutableModel<Expense> | void): Expense;
}