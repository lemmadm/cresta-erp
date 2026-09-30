"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { LogOutIcon, CircleUserRoundIcon, CreditCardIcon, BellIcon } from "lucide-react";
import { ThemeSegmentControl } from "./theme-segment-control";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"

type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUser({
        id: "1",
        email: "biprodas.cse@gmail.com",
        name: "Biprodas R.",
        avatar: "/avatars/shadcn.jpg",
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">Sign in</Button>
      </Link>
    );
  }

  const initials = user.name?.split(" ").map((name) => name.charAt(0)).join("") || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <button className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-sm font-semibold hover:bg-primary/20 transition-colors outline-none">
          {initials}
        </button> */}
        <Button variant="outline" size="icon" className="rounded-lg">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} className="rounded-lg"/>
            <AvatarFallback className="rounded-lg bg-primary text-white font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 space-y-1">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-primary text-white font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          <ThemeSegmentControl />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <CircleUserRoundIcon />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/login")}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
