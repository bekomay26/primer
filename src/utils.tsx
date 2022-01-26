import React from "react";

export const formatDate = (dateString: string) => {
  const theDate = new Date(dateString);
  return Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(theDate);
};
export const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount / 100);
};

export const transactionStatuses = [
  { label: "All", value: "ALL" },
  { label: "Failed", value: "FAILED" },
  { label: "Settling", value: "SETTLING" },
  { label: "Authorized", value: "AUTHORIZED" },
  { label: "Settled", value: "SETTLED" },
  { label: "Declined", value: "DECLINED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const transactionCurrencies = [
  { label: "All", value: "ALL" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "USD", value: "USD" },
];

export const currencyToSymbol = {
  USD: "$", // US Dollar
  EUR: "€", // Euro
  GBP: "£", // British Pound Sterling
};

export const processors = [
  { label: "All", value: "ALL" },
  { label: "Adyen", value: "ADYEN" },
  { label: "Stripe", value: "STRIPE" },
  { label: "Paypal", value: "PAYPAL" },
  { label: "Braintree", value: "BRAINTREE" },
];

export const paymentMethods = [
  { label: "All", value: "ALL" },
  { label: "Visa", value: "VISA" },
  { label: "Mastercard", value: "MASTERCARD" },
  { label: "Maestro", value: "MAESTRO" },
  { label: "Amex", value: "AMEX" },
  { label: "JCB", value: "JCB" },
];

export const ThreeDSecureCodes = {
  NOT_PERFORMED: { label: "Not Performed", mode: "NEUTRAL" },
};
