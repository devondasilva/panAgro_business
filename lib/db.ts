import fs from "fs";
import path from "path";
import {
  Admin,
  Investor,
  ExchangeRates,
  InvestmentOffer,
  Investment,
  InvestmentStatus,
  FranchiseLead,
  LeadStatus,
  Product,
  Order,
  OrderStatus,
  Currency,
  PaymentMethod,
} from "./types";
import { verifyPassword } from "./password";
import { deleteUploadedFile } from "./upload";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(file: string): T {
  const filePath = path.join(dataDir, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON<T>(file: string, value: T): void {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf-8");
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Admins ----------
export function getAdmins(): Admin[] {
  return readJSON<Admin[]>("admins.json");
}

export function verifyAdminCredentials(username: string, password: string): Admin | null {
  const admin = getAdmins().find((a) => a.username === username.trim());
  if (!admin) return null;
  return verifyPassword(password, admin.passwordHash, admin.passwordSalt) ? admin : null;
}

// ---------- Investors ----------
export function getInvestors(): Investor[] {
  return readJSON<Investor[]>("investors.json");
}

export function getInvestorById(id: string): Investor | undefined {
  return getInvestors().find((i) => i.id === id);
}

export function getInvestorByEmailOrPhone(emailOrPhone: string): Investor | undefined {
  const v = emailOrPhone.trim().toLowerCase();
  return getInvestors().find(
    (i) => i.email.toLowerCase() === v || i.phone === emailOrPhone.trim()
  );
}

export function findOrCreateInvestor(name: string, email: string, phone: string): Investor {
  const investors = getInvestors();
  const existing = investors.find(
    (i) => i.email.toLowerCase() === email.trim().toLowerCase() || i.phone === phone.trim()
  );
  if (existing) return existing;
  const investor: Investor = {
    id: newId("inv"),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    createdAt: new Date().toISOString(),
  };
  investors.push(investor);
  writeJSON("investors.json", investors);
  return investor;
}

// ---------- Taux de change ----------
export function getRates(): ExchangeRates {
  return readJSON<ExchangeRates>("rates.json");
}

export function updateRates(fcfaPerUnit: { EUR: number; USD: number }): ExchangeRates {
  const rates: ExchangeRates = { fcfaPerUnit, updatedAt: new Date().toISOString() };
  writeJSON("rates.json", rates);
  return rates;
}

// ---------- Offres d'investissement ----------
export function getOffers(): InvestmentOffer[] {
  return readJSON<InvestmentOffer[]>("offers.json");
}

export function getOfferById(id: string): InvestmentOffer | undefined {
  return getOffers().find((o) => o.id === id);
}

export function createOffer(offer: Omit<InvestmentOffer, "id">): InvestmentOffer {
  const offers = getOffers();
  const full: InvestmentOffer = { ...offer, id: newId("offer") };
  offers.push(full);
  writeJSON("offers.json", offers);
  return full;
}

export function updateOffer(
  id: string,
  patch: Partial<Omit<InvestmentOffer, "id">>
): InvestmentOffer | undefined {
  const offers = getOffers();
  const idx = offers.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  offers[idx] = { ...offers[idx], ...patch };
  writeJSON("offers.json", offers);
  return offers[idx];
}

export function deleteOffer(id: string): boolean {
  const offers = getOffers();
  const next = offers.filter((o) => o.id !== id);
  if (next.length === offers.length) return false;
  writeJSON("offers.json", next);
  return true;
}

// ---------- Investissements ----------
export function getInvestments(): Investment[] {
  return readJSON<Investment[]>("investments.json");
}

export function getInvestmentsByInvestor(investorId: string): Investment[] {
  return getInvestments()
    .filter((i) => i.investorId === investorId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function createInvestment(
  investment: Omit<Investment, "id" | "createdAt" | "status"> & { status?: InvestmentStatus }
): Investment {
  const investments = getInvestments();
  const full: Investment = {
    ...investment,
    status: investment.status ?? "en_attente",
    id: newId("iv"),
    createdAt: new Date().toISOString(),
  };
  investments.push(full);
  writeJSON("investments.json", investments);
  return full;
}

export function updateInvestmentStatus(
  id: string,
  status: InvestmentStatus
): Investment | undefined {
  const investments = getInvestments();
  const idx = investments.findIndex((i) => i.id === id);
  if (idx === -1) return undefined;
  investments[idx].status = status;
  writeJSON("investments.json", investments);
  return investments[idx];
}

// ---------- Demandes de franchise (leads) ----------
export function getFranchiseLeads(): FranchiseLead[] {
  return readJSON<FranchiseLead[]>("franchise-leads.json");
}

export function createFranchiseLead(
  lead: Omit<FranchiseLead, "id" | "createdAt" | "status">
): FranchiseLead {
  const leads = getFranchiseLeads();
  const full: FranchiseLead = {
    ...lead,
    status: "nouveau",
    id: newId("lead"),
    createdAt: new Date().toISOString(),
  };
  leads.push(full);
  writeJSON("franchise-leads.json", leads);
  return full;
}

export function updateLeadStatus(id: string, status: LeadStatus): FranchiseLead | undefined {
  const leads = getFranchiseLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  leads[idx].status = status;
  writeJSON("franchise-leads.json", leads);
  return leads[idx];
}

export function deleteLead(id: string): boolean {
  const leads = getFranchiseLeads();
  const next = leads.filter((l) => l.id !== id);
  if (next.length === leads.length) return false;
  writeJSON("franchise-leads.json", next);
  return true;
}

// ---------- Produits ----------
export function getProducts(): Product[] {
  return readJSON<Product[]>("products.json");
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function createProduct(
  product: Omit<Product, "id" | "createdAt" | "images"> & { images?: string[] }
): Product {
  const products = getProducts();
  const full: Product = {
    ...product,
    images: product.images ?? [],
    id: newId("prod"),
    createdAt: new Date().toISOString(),
  };
  products.push(full);
  writeJSON("products.json", products);
  return full;
}

export function updateProduct(
  id: string,
  patch: Partial<Omit<Product, "id" | "createdAt">>
): Product | undefined {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  products[idx] = { ...products[idx], ...patch };
  writeJSON("products.json", products);
  return products[idx];
}

export function addProductImages(id: string, imagePaths: string[]): Product | undefined {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  products[idx].images = [...products[idx].images, ...imagePaths];
  writeJSON("products.json", products);
  return products[idx];
}

export function removeProductImage(id: string, imagePath: string): Product | undefined {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  products[idx].images = products[idx].images.filter((img) => img !== imagePath);
  writeJSON("products.json", products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const target = products.find((p) => p.id === id);
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return false;
  if (target) for (const img of target.images) deleteUploadedFile(img);
  writeJSON("products.json", next);
  return true;
}

// ---------- Commandes ----------
export function getOrders(): Order[] {
  return readJSON<Order[]>("orders.json");
}

export function getOrdersByInvestor(investorId: string): Order[] {
  return getOrders()
    .filter((o) => o.investorId === investorId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function createOrder(
  order: Omit<Order, "id" | "createdAt" | "status"> & { status?: OrderStatus }
): Order {
  const orders = getOrders();
  const full: Order = {
    ...order,
    status: order.status ?? "en_attente",
    id: newId("ord"),
    createdAt: new Date().toISOString(),
  };
  orders.push(full);
  writeJSON("orders.json", orders);

  const products = getProducts();
  for (const item of order.items) {
    const p = products.find((pr) => pr.id === item.productId);
    if (p) p.stock = Math.max(0, p.stock - item.qty);
  }
  writeJSON("products.json", products);

  return full;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return undefined;
  orders[idx].status = status;
  writeJSON("orders.json", orders);
  return orders[idx];
}

export type { Currency, PaymentMethod };
