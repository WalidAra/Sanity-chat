import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchInput from "../components/atoms/search-input";
import { LuList } from "react-icons/lu";
import { LucideGrid2X2 } from "lucide-react";
import UserCard from "../components/molecules/user-card";

const Search = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-xl font-bold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:leading-[1.1]">
        Search for people to talk to
      </h1>

      <div className="flex items-center w-full justify-between">
        <SearchInput />

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
        className={`flex border rounded-2xl p-4 ${
          isGridLayout ? "grid-cols-3 grid gap-4" : "flex-col gap-2"
        }`}
      >
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default Search;
