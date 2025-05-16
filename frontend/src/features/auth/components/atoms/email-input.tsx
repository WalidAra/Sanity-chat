import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

const EmailInput = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <div className="relative">
      <Input type="email" className={cn("peer pe-9", className)} {...props} />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
        <MailIcon size={16} aria-hidden="true" />
      </div>
    </div>
  );
};

export default EmailInput;
