import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => setOpen(true)}
        className={"lg:hidden sm:block cursor-pointer"}
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={logoutHandler}
          className={
            "inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
          }
        >
          {" "}
          <LogOut /> Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
