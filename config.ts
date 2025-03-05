const isProd =
  typeof window !== 'undefined' && window.location.href.includes('https://www.metabole.studio/');

export const config = {
  api: {
    baseUrl: isProd
      ? process.env.NEXT_PUBLIC_PROD_API_BASE_URL
      : process.env.NEXT_PUBLIC_DEV_API_BASE_URL,
  },
};

export type Config = typeof config;
