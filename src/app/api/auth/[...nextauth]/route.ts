import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

export const authoptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};
