export type itemTypes = {
  id: string;
  type: string;
  typedish: string;
  price: number;
  name: string;
  quantity: number;
};

export interface daySale {
  id: string;
  created_at: object;
  day: object;
  sale: number;
  typedish: object;
}
