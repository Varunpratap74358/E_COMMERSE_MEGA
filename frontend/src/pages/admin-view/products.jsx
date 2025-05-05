import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommanForm from "@/components/comman/form";
import { addProductFormElement } from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList?.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil((productsList?.length || 0) / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setCurrentEditedId(null);
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handelDelete = (getCurrentProductId) => {
    const check = confirm("You Want to delete this product");
    if (check) {
      const againCheck = confirm("Think again you want to delete this product");
      if (againCheck) {
        const onceAgain = confirm("This is last time to think again");
        if (onceAgain) {
          dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
            }
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          className={"cursor-pointer bg-amber-500 hover:bg-amber-600"}
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add New Products
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts && currentProducts.length > 0
          ? currentProducts.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                key={productItem?._id}
                product={productItem}
                handelDelete={handelDelete}
              />
            ))
          : <p>No products found.</p>}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="bg-gray-300 text-black hover:bg-gray-400"
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="bg-gray-300 text-black hover:bg-gray-400"
        >
          Next
        </Button>
      </div>

      {/* Add/Edit Product Sheet */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className={"overflow-auto"}>
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Products"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="p-6">
            <CommanForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElement}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};


export default AdminProducts;
