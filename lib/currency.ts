import { Currency, ExchangeRates } from "./types";

export const CURRENCIES: Currency[] = ["FCFA", "EUR", "USD"];

export const CURRENCY_LABEL: Record<Currency, string> = {
  FCFA: "Franc CFA (XOF)",
  EUR: "Euro",
  USD: "Dollar américain",
};

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  FCFA: "FCFA",
  EUR: "€",
  USD: "$",
};

/** Convertit un montant en FCFA vers la devise cible, à partir des taux fournis. */
export function fromFCFA(amountFCFA: number, target: Currency, rates: ExchangeRates): number {
  if (target === "FCFA") return amountFCFA;
  return amountFCFA / rates.fcfaPerUnit[target];
}

/** Convertit un montant exprimé dans une devise donnée vers son équivalent en FCFA. */
export function toFCFA(amount: number, from: Currency, rates: ExchangeRates): number {
  if (from === "FCFA") return amount;
  return amount * rates.fcfaPerUnit[from];
}

export function formatAmount(amount: number, currency: Currency): string {
  const rounded =
    currency === "FCFA" ? Math.round(amount) : Math.round(amount * 100) / 100;
  const formatted = rounded.toLocaleString("fr-FR", {
    minimumFractionDigits: currency === "FCFA" ? 0 : 2,
    maximumFractionDigits: currency === "FCFA" ? 0 : 2,
  });
  return currency === "FCFA"
    ? `${formatted} FCFA`
    : currency === "EUR"
      ? `${formatted} €`
      : `${formatted} $`;
}

/** Convertit puis formate directement un montant FCFA vers la devise cible. */
export function formatFromFCFA(amountFCFA: number, target: Currency, rates: ExchangeRates): string {
  return formatAmount(fromFCFA(amountFCFA, target, rates), target);
}
