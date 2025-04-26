import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems,setOpenCartSheet }) => {
  const navigate = useNavigate();
  
  const totalCartAmount =
    cartItems && cartItems?.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity ,
          0
        )
      : 0;

    const handelCheckOutFun=()=>{
      navigate('/shop/checkout')
      setOpenCartSheet(false)
    }

  return (
    <SheetContent className={"sm:max-w-md px-4"}>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, i) => (
              <UserCartItemsContent key={i} cartItems={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4 ">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount} </span>
        </div>
      </div>
      <Button onClick={handelCheckOutFun} className={"w-full mt-6"}>Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
