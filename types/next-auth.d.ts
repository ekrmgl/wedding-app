// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Session tipini genişleterek id özelliği ekliyoruz
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
    expires: string;
  }
}