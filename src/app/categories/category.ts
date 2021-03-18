import { Subcategory } from "./subcategory";

export interface Category {
    id: number;
    name: string;
    state: boolean;
    subcategories: Array<Subcategory>
  }