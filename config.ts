const isProd = typeof window !== 'undefined' && window.location.href.includes('metabole.studio');

export const config = {
  api: {
    baseUrl: isProd
      ? process.env.NEXT_PUBLIC_PROD_API_BASE_URL
      : process.env.NEXT_PUBLIC_DEV_API_BASE_URL,
    key: isProd ? process.env.NEXT_PRIVATE_DEV_API_KEY : process.env.NEXT_PRIVATE_PROD_API_KEY,
  },
};

export type Config = typeof config;
