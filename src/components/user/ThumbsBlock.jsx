import { useState } from "react";
import ThumbsUp from "../../images/modal/thumbs-up.svg";
import ThumbsDown from "../../images/modal/thumbs-down.svg";
import ThumbsUpActive from "../../images/modal/thumbs-up-active.svg";
import ThumbsDownActive from "../../images/modal/thumbs-down-active.svg";
import "../../styles/user-category.sass";
import "../../styles/thumbsblock.sass";

export default function ThumbsBlock() {
  const [openThumb, setOpenThumb] = useState(false);
  const [openThumbUp, setOpenThumbUp] = useState(false);
  const [openThumbDown, setOpenThumbDown] = useState(false);
  const [thumb, setThumb] = useState(0);

  function changeThumbsUp() {
    setOpenThumbUp(!openThumbUp);
    setOpenThumbDown(false);
    setThumb(1);
  }

  function changeThumbsDown() {
    setOpenThumbDown(!openThumbDown);
    setOpenThumbUp(false);
    setThumb(2);
  }

  let image;
  switch (thumb) {
    case 1:
      image = ThumbsUpActive;
      break;
    case 2:
      image = ThumbsDownActive;
      break;
    default:
      image = ThumbsUp;
  }

  return (
    <div className="thumbsblock-block">
      {openThumb ? (
        <div onClick={() => setOpenThumb(false)}>
          <img
            src={openThumbUp ? ThumbsUpActive : ThumbsUp}
            className="user-category-icon"
            onClick={changeThumbsUp}
          />
          <img
            src={openThumbDown ? ThumbsDownActive : ThumbsDown}
            className="user-category-icon"
            onClick={changeThumbsDown}
          />
        </div>
      ) : (
        <img
          src={image}
          className="user-category-icon"
          onClick={() => setOpenThumb(!openThumb)}
        />
      )}
    </div>
  );
}
