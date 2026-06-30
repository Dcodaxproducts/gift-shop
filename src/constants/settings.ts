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
  fields: [
    { id: "stripePublishableKey", label: "Stripe Publishable Key", type: "text" },
    { id: "stripeSecretKey", label: "Stripe Secret Key", type: "password" },
    { id: "stripeWebhookSecret", label: "Stripe Webhook Secret", type: "password" },
  ],
};

export const firebaseServiceAccountSetting = {
  id: "firebase-service-account",
  label: "FIREBASE_SERVICE_ACCOUNT",
  placeholder: "{ \"type\": \"service_account\", \"project_id\": \"...\" }",
};

export const storageSettings = [
  { id: "awsS3BucketName", label: "AWS S3 Bucket Name", type: "text" },
  { id: "awsRegion", label: "AWS Region", type: "text" },
  { id: "awsAccessKey", label: "Access Key", type: "password" },
  { id: "awsSecretKey", label: "Secret Key", type: "password" },
];

export const emailSettings = [
  { id: "smtpHost", label: "SMTP Host", type: "text" },
  { id: "smtpPort", label: "SMTP Port", type: "text" },
  { id: "smtpUsername", label: "SMTP Username", type: "text" },
  { id: "smtpPassword", label: "SMTP Password", type: "password" },
  { id: "senderEmail", label: "Sender Email", type: "email" },
  { id: "senderName", label: "Sender Name", type: "text" },
];
