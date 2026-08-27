export const platformSettings = {
  appName: "FintechOS Enterprise",
  supportEmail: "support@fintechos.io",
  logoHint: "PNG, SVG up to 2MB",
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

export const financialSettings = [
  { id: "platformRatePercent", label: "Platform Rate (%)", type: "number" },
  { id: "minimumPayoutThreshold", label: "Minimum Payout Threshold", type: "number" },
];

export const emailSettings = [
  { id: "smtpHost", label: "SMTP Host", type: "text" },
  { id: "smtpPort", label: "SMTP Port", type: "text" },
  { id: "smtpUsername", label: "SMTP Username", type: "text" },
  { id: "smtpPassword", label: "SMTP Password", type: "password" },
  { id: "senderEmail", label: "Sender Email", type: "email" },
  { id: "senderName", label: "Sender Name", type: "text" },
];
