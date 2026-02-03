/**
 * Currency Formatting Utilities
 */

export type CurrencyCode = "USD" | "INR" | string;

interface CurrencyFormatOptions {
  currency?: CurrencyCode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

// Exchange rates relative to INR (Base Currency)
// These are default fallback rates
export let EXCHANGE_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012, // Approx 1 USD = 83.33 INR
};

/**
 * Fetches the latest exchange rates from a free API (Frankfurter)
 * Base currency is always INR for this application
 */
export const fetchExchangeRates = async (): Promise<void> => {
  try {
    // Frankfurter API is free and doesn't require a key
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=INR&to=USD",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    // Update local exchange rates
    if (data && data.rates) {
      EXCHANGE_RATES = {
        INR: 1,
        ...data.rates,
      };
      console.log("Updated exchange rates:", EXCHANGE_RATES);
    }
  } catch (error) {
    console.warn("Failed to update exchange rates, using fallbacks:", error);
    // Silent fail - continue using fallback rates
  }
};

/**
 * Formats a number as a price string with the correct currency symbol and locale formatting.
 * Automatically converts the amount from INR to the target currency.
 *
 * @param amount - The numerical amount in INR (Base Currency)
 * @param currency - The target currency code (default: "INR")
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted price string (e.g., "₹1,00,000" or "$1,200.00")
 */
export const formatPrice = (
  amount: number | undefined | null,
  currency: CurrencyCode = "INR",
  options: Omit<CurrencyFormatOptions, "currency"> = {},
): string => {
  if (amount === undefined || amount === null) return "";

  // 1. Convert amount
  const rate = EXCHANGE_RATES[currency] || 1;
  const convertedAmount = amount * rate;

  // Determine locale based on currency
  // INR uses 'en-IN' for Indian numbering system (lakhs/crores)
  // USD uses 'en-US' for international numbering
  let locale = "en-IN";
  if (currency === "USD") {
    locale = "en-US";
  } else if (currency !== "INR") {
    // Fallback for other currencies to generic english or standard locale
    locale = "en-US";
  }

  // Default fraction digits: 0 for INR (usually), 2 for USD
  const defaultFractionDigits = currency === "INR" ? 0 : 2;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits:
        options.minimumFractionDigits ?? defaultFractionDigits,
      maximumFractionDigits:
        options.maximumFractionDigits ?? defaultFractionDigits,
    }).format(convertedAmount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    // Fallback if Intl fails
    return `${currency} ${convertedAmount.toFixed(2)}`;
  }
};

/**
 * Gets the symbol for a given currency code
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  try {
    return (0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
  } catch {
    return currency;
  }
};
