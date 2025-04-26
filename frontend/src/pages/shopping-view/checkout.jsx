import React, { useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/orderSlice";
import { toast } from "sonner";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart,setIsPaymentStart] = useState(false)
  const {approvalURL,isLoading} = useSelector(state=>state.shopOrder)
// console.log(approvalURL)
  const dispatch = useDispatch();

  // console.log(currentSelectedAddress,"current")

  const totalCartAmount =
    cartItems && cartItems?.items?.length > 0
      ? cartItems?.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handelInitiatePaypalPayment = () => {
    if(cartItems.length === 0){
      toast.success("Your cart is empthy. Please add item to proceed!")
      return;
    }

    if(currentSelectedAddress===null){
      toast.error("Please select one address....")
      
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId:cartItems?._id,
      cartItems: cartItems?.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // console.log(orderData)
    dispatch(createNewOrder(orderData)).then((data)=>{
      if(data?.payload?.success){
        setIsPaymentStart(true)

      }else{
        setIsPaymentStart(false)
      }
    })
  };

  if(approvalURL){
    window.location.href = approvalURL
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress?._id} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems?.items && cartItems?.items?.length > 0
            ? cartItems?.items.map((item) => (
                <UserCartItemsContent key={item._id} cartItems={item} />
              ))
            : ""}
          <div className="mt-8 space-y-4 ">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount} </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handelInitiatePaypalPayment}
              className={
                "w-full bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-200"
              }
            >
              {
                isPaymentStart ? 'Processing Paypal Payment...' : 'Checkout with Paypal'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
