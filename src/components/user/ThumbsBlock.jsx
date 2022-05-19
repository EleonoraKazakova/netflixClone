import { useState } from "react";
import ThumbsUp from "../../images/modal/thumbs-up.svg";
import ThumbsDown from "../../images/modal/thumbs-down.svg";
import "../../styles/user-category.sass";

export default function ThumbsBlock() {
  const [openThumb, setOpenThumb] = useState(false);
  const [openThumbUp, setOpenThumbUp] = useState(false);
  const [openThumbDown, setOpenThumbDown] = useState(false);

  return (
    <>
      <img
        src={ThumbsUp}
        className="user-category-icon"
        onClick={() => setOpenThumb(!openThumb)}
      />
      {openThumb ? (
        <div>
          <img src={ThumbsUp} className="user-category-icon" />
          <img src={ThumbsDown} className="user-category-icon" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
