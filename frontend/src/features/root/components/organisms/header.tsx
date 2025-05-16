import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  image: string;
};

const Header = ({ image, name }: Props) => {
  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h1 className="text-sm font-medium">{name}</h1>
          <p className="text-xs text-muted-foreground">online</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
