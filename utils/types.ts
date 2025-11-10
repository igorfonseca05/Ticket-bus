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

export interface ticketDetailsProps {
  ticketDetails: {
    _id: string;
    name: string;
    date: string;
    logo: string;
    routes: {
      from: string;
      to: string;
      price: number;
      time: string;
    }[];
    seatNumber: number;
  };
  buyerInfos: {
    email: string;
    name: string;
    uid: string;
  };
}

export interface Ticket {
  _id: string
  name: string
  date: string
  logo: string
  route?: Route
  seatNumber: number
  createdAt: number    
  paymentMethod: string
}

export interface User {
  _id: string
  name: string
  email: string
  tickets?: Ticket[]
  history?: Ticket[]
}


export interface ResumeProps {
  ticketDetails: {
    _id: string;
    name: string;
    date: string;
    logo: string;
    route?: Route | undefined;
    seatNumber: number;
    createdAt: number;
    paymentMethod: string
  };
  passenger: User;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string | undefined;
}
