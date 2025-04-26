import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const statusColorMap = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  inprocess: "bg-blue-500",
  inshipping: "bg-indigo-500",
  delivered: "bg-purple-500",
  rejected: "bg-red-500",
};

// Function to normalize status string (lowercase + remove spaces)
const normalizeStatus = (status) => {
  return status?.toLowerCase().replace(/\s+/g, "");
};

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  // console.log(orderDetails)
  return (
    <DialogContent className={"sm:max-w-[600px]"}>
      <div className="grid gap-6">
        <div className="grid grid-col gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate?.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method </p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status </p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white capitalize ${
                  statusColorMap[normalizeStatus(orderDetails?.orderStatus)] ||
                  "bg-gray-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems?.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span className="w-full text-start">
                        <span className="font-semibold">Title:</span>{" "}
                        {item?.title}
                      </span>
                      <span className="w-full text-start">
                        <span className="font-semibold">Quantity:</span>{" "}
                        {item?.quantity}
                      </span>
                      <span className="w-full text-start">
                        <span className="font-semibold">Price:</span> $
                        {item?.price}
                      </span>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shopping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
