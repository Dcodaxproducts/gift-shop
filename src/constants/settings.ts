export const platformSettings = {
  appName: "FintechOS Enterprise",
  supportEmail: "support@fintechos.io",
  logoHint: "PNG, SVG up to 2MB",
};

export const securitySettings = {
  sessionTimeout: "30-minutes",
  timeoutOptions: [
    { value: "15-minutes", label: "15 Minutes" },
    { value: "30-minutes", label: "30 Minutes" },
    { value: "60-minutes", label: "60 Minutes" },
  ],
  passwordPolicies: ["Uppercase", "Numbers", "Min 12 Chars", "Symbols"],
};

export const paymentSettings = {
  defaultCurrency: "usd",
  currencyOptions: [
    { value: "usd", label: "USD - United States Dollar" },
    { value: "eur", label: "EUR - Euro" },
    { value: "gbp", label: "GBP - British Pound" },
  ],
  transactionFee: "2.50",
};

export const notificationSettings = [
  {
    title: "Push Notifications",
    description: "Alerts via browser and mobile",
    enabled: true,
  },
  {
    title: "Email Notifications",
    description: "Daily summaries and security alerts",
    enabled: true,
  },
];
