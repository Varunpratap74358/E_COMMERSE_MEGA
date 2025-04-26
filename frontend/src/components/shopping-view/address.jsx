import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommanForm from "../comman/form";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  editaAddress,
  fetchAllAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = ({setCurrentSelectedAddress,selectedId}) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [curresntEditId, setCurrentEditId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const dispatch = useDispatch();

  const handelManageAddress = (e) => {
    e.preventDefault();
    if(addressList.length >= 3 && curresntEditId === null){
        toast.error("You can't add more then 3 address!")
        setFormData(initialAddressFormData)
        return;
    }
    curresntEditId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: curresntEditId,
            formData,
          })
        ).then((data) => {
          setFormData(initialAddressFormData);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditId(null)
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            //   console.log(data);
            setFormData(initialAddressFormData);
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setCurrentEditId(null)
            }
          }
        );
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handelEditAddress = (getCurrentAddress) => {
    setCurrentEditId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      pincode: getCurrentAddress?.pincode || "",
      notes: getCurrentAddress?.notes || "",
    });
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mx-3 mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem?._id}
                handelEditAddress={handelEditAddress}
                setCurrentEditId={setCurrentEditId}
                setFormData={setFormData}
                addressInfo={singleAddressItem}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
              />
            ))
          : ""}
      </div>
      <CardHeader>
        <CardTitle className={"text-xl font-bold"}>
          {curresntEditId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className={"space-y-3"}>
        <CommanForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={curresntEditId !== null ? "Edit" : "Add"}
          onSubmit={handelManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
