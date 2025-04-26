import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cartSlice";
import { toast } from "sonner";

const UsercartItemContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const  itemsCart  = useSelector((state) => state.shopCart.cartItems);

  const { productList } = useSelector((state) => state.shopProducts);

  const handelCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    );
  };

  const handeUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getitemsCart = itemsCart.items || [];

      if (getitemsCart.length) {
        const indexOfCurrentCartItem = getitemsCart.findIndex(
          (item) => item.productId === getCartItem?.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getitemsCart[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            alert(`Only ${getTotalStock} items are in stock.`)
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    );
  };


  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <Button
            variant={"outline"}
            size={"icon"}
            disabled={cartItems?.quantity === 1}
            className={"h-8 w-8 rounded-full cursor-pointer"}
            onClick={() => handeUpdateQuantity(cartItems, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            variant={"outline"}
            size={"icon"}
            className={"h-8 w-8 rounded-full cursor-pointer"}
            onClick={() => handeUpdateQuantity(cartItems, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Iccrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItems?.salePrice > 0
            ? cartItems?.salePrice
            : cartItems?.price * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handelCartItemDelete(cartItems)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UsercartItemContent;
