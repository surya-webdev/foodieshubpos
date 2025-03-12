export type itemTypes = {
  id: string;
  created_at: Date;
  type: string;
  typedish: string;
  price: number;
  name: string;
  quantity: number;
};

export interface daySale {
    id: string;
    created_at: Date;
    day: Date | null;
    sale: number | null;
    typedish: string | null;
    quantity : number | 1;
}