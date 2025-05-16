import { withoutAuth } from "@/components/guards/without-auth";
import { buttonVariants } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen grid md:grid-cols-2 p-4">
      <div className="flex flex-col p-4">
        <div className="w-full flex items-center justify-end">
          <Link
            to={"/"}
            className={buttonVariants({
              variant: "link",
              size: "sm",
              className: "text-muted-foreground",
            })}
          >
            Go back
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="min-w-sm ">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-primary rounded-2xl"></div>
    </div>
  );
};

const AuthLayoutWithGuard = withoutAuth(AuthLayout);
export default AuthLayoutWithGuard;
