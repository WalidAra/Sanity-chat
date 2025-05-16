import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import EmailInput from "../components/atoms/email-input";
import { useMutation } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";
import { AiOutlineLoading } from "react-icons/ai";
import PasswordInput from "../components/atoms/password-input";
import { useAuth } from "@/hooks/use-auth";
import { AccessToken } from "@/types";

const SignIn = () => {
  const { signToken } = useAuth();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: z.infer<typeof signInSchema>) => {
      return await fetchData<AccessToken>({
        endpoint: "sign-in",
        feature: "auth",
        method: "POST",
        payload: values,
      });
    },
    onSuccess: ({ data: { accessToken } }) => {
      signToken(accessToken);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log("values => ", values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 "
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Yoo, welcome back!</h1>
          <div className="text-center text-sm text-muted-foreground">
            First time here?
            <Link
              to={"/auth/sign-up"}
              className={"underline ml-1 text-primary"}
            >
              Sign up here for free
            </Link>
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <EmailInput placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  input={field.value}
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gap-1 ">
          {isPending ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <>Sign in</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignIn;
