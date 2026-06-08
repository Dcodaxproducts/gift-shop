
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deliveryway.s3.eu-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.yourdomain.com",
      },
    ],
  },
};

export default nextConfig;