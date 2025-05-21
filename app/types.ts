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

export type apiResponse = {
 data : {status:boolean};
}

export type monthKey = {
 month:string,
 sales:daySale[],
 totalSales:number,
 sortKey:string
}

 export type dayResponse = {
  daySale:number
  dayItem: {
    sale: number;
    day: string;
    id: string;
    created_at: Date;
    typedish: string;
    quantity: number;
}[],
dayOrder:number
}

export type topSelling = {
  name:string;
  order: number
}