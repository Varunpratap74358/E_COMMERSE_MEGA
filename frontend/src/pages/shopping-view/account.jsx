import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className={'flex gap-3 px-2 text-black'}>
              <TabsTrigger value="orders" className="cursor-pointer hover:bg-slate-200 roundde px-2 hover:font-semibold">Orders</TabsTrigger>
              <TabsTrigger value="address" className="cursor-pointer hover:bg-slate-200 roundde px-2 hover:font-semibold">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders"><ShoppingOrders /> </TabsContent>
            <TabsContent value="address"><Address /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
