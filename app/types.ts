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
    typedish: string | null;
    day: Date | null;
    sale: number | null;
}