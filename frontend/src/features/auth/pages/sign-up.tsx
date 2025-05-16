import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../validators";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import EmailInput from "../components/atoms/email-input";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading } from "react-icons/ai";
import PasswordInput from "../components/atoms/password-input";
import { Input } from "@/components/ui/input";
import fetchData from "@/lib/fetcher";
import { AccessToken } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { AxiosError } from "axios";

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const { signToken } = useAuth();

  const { isPending, mutate } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (values: z.infer<typeof signUpSchema>) => {
      return await fetchData<AccessToken>({
        endpoint: "sign-up",
        feature: "auth",
        method: "POST",
        payload: values,
      });
    },
    onSuccess: ({ data: { accessToken } }) => {
      signToken(accessToken);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message, { position: "bottom-center" });
      }
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 "
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">Yoo, welcome!</h1>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?
            <Link
              to={"/auth/sign-in"}
              className={"underline ml-1 text-primary"}
            >
              Sign in here
            </Link>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                This will be your display name for the app.
              </FormDescription>
            </FormItem>
          )}
        />
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

export default SignUp;
