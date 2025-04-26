import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { setProductDetails } from "@/store/shop/productSlice";
import { toast } from "sonner";
import { Label } from "../ui/label";
import StarRatingComponent from "../comman/star-rating";
import { addReview, getReviews } from "@/store/shop/reviewSlice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  // console.log(reviews)
  function handelRatingChange(getRating) {
    setRating(getRating);
  }
  const handelAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      // console.log(data)
      if (data?.payload?.success) {
        setRating(0)
        setReviewMsg('')
        dispatch(getReviews(productDetails?._id));
      }
    });
  };
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
    // alert(getCurrentProductId)
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

  const handelDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);
  // console.log(reviews)

  const averageReview = reviews && reviews.length > 0 ?  reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviews.length : 0;


  return (
    <Dialog open={open} onOpenChange={handelDialogClose}>
      <DialogContent
        className={
          "grid grid-cols-2 gap-8 sm:p-12 max-w-[90cw] sm:max-w-[80vw] lg:max-w-[70vw]"
        }
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div className="">
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 mt-2">
             <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className={" w-full cursor-not-allowed opacity-60"}>
                Out Of Stock
              </Button>
            ) : (
              <Button
                className={" w-full cursor-pointer"}
                onClick={() =>
                  handelAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] flex flex-col gap-4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((v, i) => (
                <div key={i} className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className={"w-10 h-10 border"}>
                      <AvatarFallback>
                        {v?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{v.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={v.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{v.reviewMessage}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>Not any reviews</h1>
            )}
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="">
                <StarRatingComponent
                  rating={rating}
                  handelRatingChange={handelRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review...."
              />
              <Button
                onClick={handelAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
