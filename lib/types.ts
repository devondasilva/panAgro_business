export type Currency = "FCFA" | "EUR" | "USD";
export type UserRole = "admin" | "investor";
export type PaymentMethod = "mtn_momo" | "moov_money" | "carte_bancaire" | "virement";

export interface Admin {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

export interface SessionPayload {
  role: UserRole;
  id: string;
  name: string;
  exp: number;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface ExchangeRates {
  // Combien de FCFA vaut 1 unité de chaque devise. Le FCFA (XOF) est arrimé
  // à l'euro par traité (1 EUR = 655,957 FCFA, taux fixe) ; le dollar flotte
  // et doit être mis à jour régulièrement par un administrateur.
  fcfaPerUnit: { EUR: number; USD: number };
  updatedAt: string;
}

export type InvestmentStatus = "en_attente" | "confirmee" | "terminee" | "annulee";

export interface InvestmentOffer {
  id: string;
  title: string;
  durationLabel: string;
  roiPercent: number;
  minAmountFCFA: number;
  benefits: string[];
  featured: boolean;
  active: boolean;
}

export interface Investment {
  id: string;
  investorId: string;
  investorName: string;
  offerId: string;
  offerTitle: string;
  amountFCFA: number;
  currency: Currency; // devise choisie par l'investisseur pour le règlement
  roiPercent: number;
  durationLabel: string;
  paymentMethod: PaymentMethod;
  status: InvestmentStatus;
  createdAt: string;
}

export type LeadStatus = "nouveau" | "traite";

export interface FranchiseLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceFCFA: number;
  images: string[];
  stock: number;
  active: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  priceFCFA: number;
}

export type OrderStatus = "en_attente" | "payee" | "expediee" | "annulee";

export interface Order {
  id: string;
  investorId: string;
  investorName: string;
  items: OrderItem[];
  totalFCFA: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
}
