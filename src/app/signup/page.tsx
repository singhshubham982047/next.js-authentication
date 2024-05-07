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
import { User } from "@/model/user.model";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { ConnectToDB } from "@/lib/utils";

const Page = () => {
  const signup = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if (!name || !email || !password)
      throw new Error("Please Provide all fields");

    // connection to the database
    await ConnectToDB();

    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists");
    const hashedPassword = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // redirect to login page
    redirect("/login");
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={signup}>
            <Input type="text" placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Signup</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col ">
          <span>or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Sign up with Google
            </Button>
          </form>
          <Link href={"/login"}>Already register? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
