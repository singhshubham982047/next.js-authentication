import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConnectToDB } from "@/lib/utils";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const Page = () => {
  const logIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (!email || !password) throw new Error("Please Provide all fields");

    // connection to the database
    await ConnectToDB();
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      const err = error as CredentialsSignin;
      return err;
    }

    // redirect to home page
    redirect("/");
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={logIn}>
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col ">
          <span>or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Log in with Google{" "}
            </Button>
          </form>
          <Link href={"/signup"}>Don't have an account? Signup</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
