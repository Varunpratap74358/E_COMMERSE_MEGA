import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAllAddress } from "@/store/shop/addressSlice";

const AddressCard = ({
  addressInfo,
  handelEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handelDeleteAddress = (addressId) => {
    dispatch(deleteAddress({ userId: user?.id, addressId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
      }
    });
  };

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${selectedId===addressInfo?._id ? 'border-black border-[3px]' : ''}`}
    >
      <CardContent className={`  grid gap-4 p-4`}>
        <Label>
          <span className="font-bold">Address:</span> {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-bold">City:</span> {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-bold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="font-bold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label>
          <span className="font-bold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className={"flex justify-between p-2"}>
        <Button
          onClick={() => handelEditAddress(addressInfo)}
          className={"bg-yellow-400 hover:bg-yellow-500 cursor-pointer"}
        >
          Edit
        </Button>
        <Button
          onClick={() => handelDeleteAddress(addressInfo?._id)}
          className={"bg-red-500 hover:bg-red-600 cursor-pointer"}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
