import s from "./EmptyModal.module.css";

export const EmptyModal = ({ data }) => {
  return (
    <>
      <div className={s.modal}>
        <span className={s.modal_heading}>{data?.title}</span>
        <span className={s.modal_subheading}>{data.subtitle}</span>
      </div>
    </>
  );
};
