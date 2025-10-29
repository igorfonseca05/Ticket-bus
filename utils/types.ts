import { ObjectId } from "mongodb";

export type Route = {
  from: string;
  to: string;
  price: number;
  time: string; // horário no formato "HH:mm"
};

export type Company = {
  _id?: ObjectId; // opcional se você ainda não salvou
  name: string;
  logo: string;
  routes: {
    from: string;
    to: string;
    price: number;
    time: string;
  }[];
};
