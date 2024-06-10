import s from "../../UserPage.module.css";
import { useStateValue } from "../../../../providers/StateProvider";
import { BoughtBookItem } from "./BoughtBookItem";

export const BoughtBooksTab = () => {
  const { boughtItems } = useStateValue();

  const renderBoughtBook = (book) => (
    <BoughtBookItem key={book.objectId} data={book} />
  );

  return (
    <>
      <div className={s.books}>
        {boughtItems.length
          ? boughtItems.map((b) => renderBoughtBook(b))
          : "none"}
      </div>
    </>
  );
};
