import s from "./Review.module.css";
import CloseBtnIcon from "../../public/Navbar/close btn.png";
import { useStateValue } from "../../providers/StateProvider";
import { useHelperFuncs } from "../../providers/HelperProvider";
import ColoredRatingIcon from "../../public/BookPage/colored star icon.png";
import CommenterAvatar from "../../public/BookPage/commenter avatar.png";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";

export const Review = ({ data }) => {
  const [reviewUser, setReviewUser] = useState({});

  useEffect(() => {
    const fetchReviewUser = async () => {
      const res = await axiosInstance.get(`/user/profile/${data.userId}`);
      console.log(res);
      setReviewUser(res);
    };

    fetchReviewUser();
  }, []);

  return (
    <>
      <div key={data.objectId} className={s.book_review}>
        <div className={s.book_review_commenter}>
          <img src={CommenterAvatar} alt="commenter avatar" />
          <span className={s.book_review_commenter_heading}>
            <b>{reviewUser.username}</b> написав рецензію
          </span>
          <span className={s.book_review_date}>
            {new Date(data.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className={s.book_review_rating}>
          <img src={ColoredRatingIcon} alt="comment star" />
          <span>{data.rating}</span>
        </div>
        <div className={s.book_review_text}>
          <p>{data.text}</p>
          {/* <span className={s.book_desc_resize}>Розгорнути</span> */}
        </div>
      </div>
    </>
  );
};
