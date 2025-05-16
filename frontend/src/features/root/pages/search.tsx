import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import SearchInput from "../components/atoms/search-input";
import { LuList } from "react-icons/lu";
import { LucideGrid2X2 } from "lucide-react";
import UserCard from "../components/molecules/user-card";
import { useMutation } from "@tanstack/react-query";
import fetchData from "@/lib/fetcher";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types";

const Search = () => {
  const { accessToken } = useAuth();
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { mutate, data } = useMutation({
    mutationFn: (search: string) =>
      fetchData<User[]>({
        endpoint: `search?search=${search}`,
        feature: "user",
        method: "GET",
        accessToken,
      }),
    mutationKey: ["search"],
    onSuccess: (data) => {
      console.log("Search results:", data);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      mutate(debouncedSearch);
    }
  }, [debouncedSearch]);

  const users = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-xl font-bold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:leading-[1.1]">
        Search for people to talk to
      </h1>

      <div className="flex items-center w-full justify-between">
        <SearchInput value={search} setValue={setSearch} />

        <div className="gap-2 flex items-center">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsGridLayout(true)}
          >
            <LucideGrid2X2 className="size-5" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsGridLayout(false)}
          >
            <LuList className="size-5" />
          </Button>
        </div>
      </div>

      <div
        className={`gap-4 ${
          isGridLayout
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            : "flex flex-col"
        }`}
      >
        {users.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Search;
