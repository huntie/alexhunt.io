declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SITE_NAME: string;
      SITE_URL: string;
      TWITTER_HANDLE: string;
    }
  }
}

export {};
