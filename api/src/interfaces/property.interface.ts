
export interface Property {
  _id: string;
  title: string;
  sqArea: Number;
  description: string,
  images: { url: string, name: string }[];
  price: Number;
  priceCycle: priceCycle;
  contactNo: string;
  isBuyable: boolean;
  isRentable: boolean;
  soldOn: Number; // epoc date
  purchasedBy: string // 
  createdBy: string;
  createdAt: Number // epoc date
  city:String;
  address: String;
}

enum priceCycle {'monthly', 'yearly', 'onetime'};
