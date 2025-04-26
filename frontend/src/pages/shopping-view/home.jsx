import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Shirt,
  Umbrella,
  Watch,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilderedProduct,
  fetchProductDetails,
} from "@/store/shop/productSlice";
import ShoppingProductTile from "./product-tile";
import { SiAdidas, SiContabo, SiNike, SiPuma, SiZara } from "react-icons/si";
import { TbBrandAuth0 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/comman";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: Umbrella },
];

const brandsWithIcons = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: SiContabo },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: TbBrandAuth0 },
];

const ShoppingHome = () => {
  const [currentSlide, setCurresntSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.commanFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelNavigateTohandelListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  const handelgetProductDetail = (getCurrentProductId) => {
    // alert(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handelAddToCart = (getCurrentProductId) => {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurresntSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilderedProduct({
        filterParams: {},
        sortParams: "price-lowto-high",
      })
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // console.log(featureImageList);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList &&
          featureImageList.length &&
          featureImageList.map((slide, index) => (
            <img
              src={slide?.image}
              alt="img"
              key={index}
              className={` ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))}
        <Button
          onClick={() =>
            setCurresntSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          variant={"outline"}
          size={"icon"}
          className={
            "absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 cursor-pointer"
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurresntSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          variant={"outline"}
          size={"icon"}
          className={
            "absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 cursor-pointer"
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                onClick={() =>
                  handelNavigateTohandelListingPage(item, "category")
                }
                key={item.id}
                className={
                  "cursor-pointer hover:shadow-lg hover:scale-[1.02]  duration-300 transition-shadow"
                }
              >
                <CardContent
                  className={"flex flex-col items-center justify-center p-6"}
                >
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcons.map((brandItem) => (
              <Card
                onClick={() =>
                  handelNavigateTohandelListingPage(brandItem, "brand")
                }
                key={brandItem.id}
                className={
                  "cursor-pointer hover:shadow-lg hover:scale-[1.02]  duration-300 transition-shadow"
                }
              >
                <CardContent
                  className={"flex flex-col items-center justify-center p-6"}
                >
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem?._id}
                    product={productItem}
                    handelgetProductDetail={handelgetProductDetail}
                    handelAddToCart={handelAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
