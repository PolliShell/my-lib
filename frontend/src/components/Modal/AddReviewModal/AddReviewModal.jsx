import s from "./AddReviewModal.module.css";
import CloseBtnIcon from "../../../public/Navbar/close btn.png";
import { useStateValue } from "../../../providers/StateProvider";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const AddReviewModal = ({ setReviewModalOpen }) => {
  return (
    <>
      <div
        className={s.modal_shadow}
        onClick={() => setReviewModalOpen(false)}
      ></div>
      <div className={s.modal}>
        <div
          className={s.modal_close_btn}
          onClick={() => setReviewModalOpen(false)}
        >
          <img src={CloseBtnIcon} alt="close btn" />
        </div>
        <form className={s.modal_inner}>
          <div className={s.modal_heading}>
            <h3>Рецензія на книгу {}</h3>
          </div>
          <div className={s.modal_rating}>
            <div className={s.modal_text}>Ваша оцінка:</div>
            <input
              name="rating"
              type="number"
              max={5}
              min={1}
              placeholder="1-5"
            />
          </div>
          <div className={s.modal_text}>
            <div className={s.modal_text_header}>Текст відгука</div>
            <textarea
              type="textarea"
              placeholder="Розкажіть про ваші враженні від читання книги, поради для інших читачів..."
              className="modal_text_field"
            />
          </div>
          <button>Залишити відгук</button>
        </form>
      </div>
    </>
  );
};
