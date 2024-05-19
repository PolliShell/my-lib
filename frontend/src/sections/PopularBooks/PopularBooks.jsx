import { BookPreview } from "../../components/BookPreview/BookPreview";

export const PopularBooks = () => {
  return (
    <>
      <section className="popular-books">
        <h2 className="popular-books-heading">Популярні книги</h2>
        <BookPreview />
      </section>
    </>
  );
};
