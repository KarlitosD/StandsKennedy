import { Stand } from "./db/schema";

declare module 'h3' {
    interface H3EventContext {
      clientId: string;
      stand?: Stand
    }
  }

export {}