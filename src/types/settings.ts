export type SystemSettings = {
  platformInfo: {
    applicationName: string;
    supportEmail: string;
    platformLogoUrl?: string | null;
  };
  payments: {
    stripePublishableKey?: string | null;
    stripeSecretKey?: string | null;
    stripeWebhookSecret?: string | null;
  };
  firebase: {
    firebaseServiceAccountJson?: string | null;
  };
  storage: {
    awsS3BucketName?: string | null;
    awsRegion?: string | null;
    awsAccessKey?: string | null;
    awsSecretKey?: string | null;
  };
  email: {
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpUsername?: string | null;
    smtpPassword?: string | null;
    senderEmail?: string | null;
    senderName?: string | null;
  };
};

export type UpdateSystemSettingsPayload = {
  platformInfo?: Partial<SystemSettings["platformInfo"]>;
  payments?: Partial<SystemSettings["payments"]>;
  firebase?: Partial<SystemSettings["firebase"]>;
  storage?: Partial<SystemSettings["storage"]>;
  email?: Partial<SystemSettings["email"]>;
};
