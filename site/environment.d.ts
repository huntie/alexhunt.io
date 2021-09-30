declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_NAME: string;
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_TWITTER_HANDLE: string;
    }
  }
}

export {};
