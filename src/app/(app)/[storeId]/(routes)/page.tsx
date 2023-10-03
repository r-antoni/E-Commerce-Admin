import prismadb from "@/lib/prismadb";
import React from "react";

type Props = {
  params: {storeId: string};
};

const Dashboard = async ({params}: Props) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active store: {store?.name}</div>;
};

export default Dashboard;
