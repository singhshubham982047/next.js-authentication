import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "@/components/client/form";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col ">
          <span>or</span>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}>
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
