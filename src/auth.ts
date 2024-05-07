import NextAuth, { CredentialsSignin } from "next-auth";
import CredetialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { User } from "./model/user.model";
import { ConnectToDB } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredetialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credential) => {
        const email = credential.email as string | undefined;
        const password = credential.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Email and Password are required");

        // connected to the database
        await ConnectToDB();

        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new CredentialsSignin("Invalid Email or Password");
        if (!user.password)
          throw new CredentialsSignin("Invalid Email or Password");

        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new CredentialsSignin("Invalid Email or Password");
        return { email: user.email, name: user.name, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
