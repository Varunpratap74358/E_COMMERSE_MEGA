import { brandOptionsMap, categoryOptionsMap } from "@/components/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const ShoppingProductTile = ({
  product,
  handelgetProductDetail,
  handelAddToCart,
}) => {
  return (
    <Card className={"w-full max-w-sm mx-auto"}>
      <div onClick={() => handelgetProductDetail(product?._id)} className="">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge
              className={"absolute top-2 left-2 bg-red-500 hover:bg-red-600"}
            >
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge
              className={
                "absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600"
              }
            >
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge
              className={
                "absolute top-2 left-2 bg-green-500 hover:bg-green-600"
              }
            >
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className={"p-4"}>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-md text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-md text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button
            className={"w-full opacity-60 cursor-not-allowed"}
          >
           Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handelAddToCart(product?._id, product?.totalStock)}
            className={"w-full cursor-pointer "}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
