import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRatingComponent = ({ rating, handelRatingChange }) => {

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant={"outline"}
          size={"icon"}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground "
          }`}
          onClick={handelRatingChange ? ()=>handelRatingChange(star) : null}
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarRatingComponent;
