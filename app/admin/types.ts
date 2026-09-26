import { Currency, PaymentMethod } from "@/lib/types";

export interface AdminOffer {
  id: string;
  title: string;
  durationLabel: string;
  roiPercent: number;
  minAmountFCFA: number;
  benefits: string[];
  featured: boolean;
  active: boolean;
}

export interface AdminInvestment {
  id: string;
  investorName: string;
  offerTitle: string;
  amountFCFA: number;
  currency: Currency;
  roiPercent: number;
  durationLabel: string;
  paymentMethod: PaymentMethod;
  status: "en_attente" | "confirmee" | "terminee" | "annulee";
}

export interface AdminOrder {
  id: string;
  investorName: string;
  items: { name: string; qty: number; priceFCFA: number }[];
  totalFCFA: number;
  currency: Currency;
  status: "en_attente" | "payee" | "expediee" | "annulee";
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  priceFCFA: number;
  images: string[];
  stock: number;
  active: boolean;
}

export interface AdminInvestor {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface AdminLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "nouveau" | "traite";
  createdAt: string;
}

export interface AdminRates {
  fcfaPerUnit: { EUR: number; USD: number };
  updatedAt: string;
}

export interface Stats {
  totals: {
    investors: number;
    investments: number;
    totalInvestedFCFA: number;
    orders: number;
    totalOrdersFCFA: number;
    products: number;
    offers: number;
    newLeads: number;
  };
  investors: AdminInvestor[];
  investments: AdminInvestment[];
  orders: AdminOrder[];
  products: AdminProduct[];
  offers: AdminOffer[];
  leads: AdminLead[];
  rates: AdminRates;
}
