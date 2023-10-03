import {UserButton, auth} from "@clerk/nextjs";
import React from "react";
import {MainNav} from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";


const Navbar = async() => {
  const {userId} = auth()
  if(!userId) {
    redirect("/sign-in")
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className="border-b-2">
      <div className="flex items-center px-5 h-16 ">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-5" />
        <div className="flex items-center space-x-5 ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
