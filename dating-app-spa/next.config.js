module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    baseUrl: process.env.BASE_URL,
    baseUrlAuth: process.env.BASE_URL_AUTH,
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
    unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY,
  },
};
