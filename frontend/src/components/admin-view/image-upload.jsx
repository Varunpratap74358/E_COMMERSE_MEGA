import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { ADMIN_API } from "@/api/API";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);

  const handelImageFileChange = (e) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handelDragOver = (e) => {
    e.preventDefault();
  };

  const handelDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handelRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    async function uploadImageToCloudinary() {
      if (!imageFile) return;
      setImageLoadingState(true);
      try {
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post(`${ADMIN_API}/products/upload-image`, data);

        if (response?.data?.success) {
          setUploadedImageUrl(response?.data?.result?.url);
        }
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setImageLoadingState(false);
      }
    }

    uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handelDragOver}
        onDrop={handelDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-3 mx-2`}
      >
        <Input
          ref={inputRef}
          id="image-upload"
          className="hidden"
          type="file"
          onChange={handelImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile?.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handelRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
