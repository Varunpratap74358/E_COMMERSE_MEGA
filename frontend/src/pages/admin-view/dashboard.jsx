import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/comman";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {featureImageList} = useSelector(state=>state.commanFeature)
  const dispatch = useDispatch()
  // console.log(uploadedImageUrl,"uploadimage url")
const handelUploadFeatureImage = ()=>{
  dispatch(addFeatureImage(uploadedImageUrl)).then(data=>{
    // console.log(data)
    if(data?.payload?.success){
      dispatch(getFeatureImages())
      setImageFile(null)
      setUploadedImageUrl('')
    }
  })
}

useEffect(()=>{
  dispatch(getFeatureImages())
},[dispatch])
// console.log(featureImageList) 
  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button className={'mt-5 w-full'} onClick={handelUploadFeatureImage}>Upload</Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImageList && featureImageList.length > 0 ? featureImageList.map(featureImage=> <div key={featureImage._id} className="relative">
            <img
              src={featureImage?.image}
              alt={'image'}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div> ) : ''
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
