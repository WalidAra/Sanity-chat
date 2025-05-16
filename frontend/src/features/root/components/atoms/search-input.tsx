import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function SearchInput({ setValue, value }: Props) {
  const id = useId();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [value]);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search..."
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
