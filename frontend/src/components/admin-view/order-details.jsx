import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommanForm from "../comman/form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/orderSlice";
import { toast } from "sonner";

// Initial form data
const initialFormData = {
  status: "",
};

// Status color map
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

const AdminOrderDetailsView = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handelUpdateStatus = (e) => {
    e.preventDefault();
    const { status } = formData;
    if (status === "") {
      toast.error("Please select any one option!");
      return;
    }
    dispatch(
      updateOrderStatus({ id: orderDetails._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails._id));
        setFormData(initialFormData);
      }
    });
  };

  return (
    <DialogContent className={"sm:max-w-[600px]"}>
      <div className="grid gap-6">
        {/* Basic Info */}
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
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white capitalize ${
                  statusColorMap[
                    normalizeStatus(orderDetails?.orderStatus)
                  ] || "bg-gray-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="w-full text-start">
                    <span className="font-semibold">Title:</span> {item?.title}
                  </span>
                  <span className="w-full text-start">
                    <span className="font-semibold">Quantity:</span>{" "}
                    {item?.quantity}
                  </span>
                  <span className="w-full text-start">
                    <span className="font-semibold">Price:</span> ${item?.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
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

        {/* Update Status Form */}
        <div>
          <CommanForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "confirmed", label: "Confirmed" },
                  { id: "pending", label: "Pending" },
                  { id: "inprocess", label: "In Process" },
                  { id: "inshipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order status"}
            onSubmit={handelUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
