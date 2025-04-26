import { Input } from "@/components/ui/input";
import { getSearchResult, resetSearchResult } from "@/store/shop/searchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "./product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { fetchProductDetails } from "@/store/shop/productSlice";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResult());
    }
  }, [keyword]);

   useEffect(() => {
      if (productDetails !== null) {
        setOpenDetailsDialog(true);
      }
    }, [productDetails]);

  const handelAddToCart = (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
    });
  };
   const handelgetProductDetail = (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId));
    };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            className={"py-6"}
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products.... Enter minmum 3 character"
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-3xl text-red-500 font-extrabold">
          No result found!
        </h1>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResults.map((item) => (
          <ShoppingProductTile
            product={item}
            handelAddToCart={handelAddToCart}
            handelgetProductDetail={handelgetProductDetail}
            key={item._id}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
