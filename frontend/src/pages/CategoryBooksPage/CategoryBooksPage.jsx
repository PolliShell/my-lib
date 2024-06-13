import s from "./CategoryBooksPage.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookList } from "../../components/BookList/BookList";

export const CategoryBooksPage = () => {
  return (
    <>
      <Navbar />
      <main className={`${s.main} container`}>
        <BookList type="categorySearch" />
      </main>
    </>
  );
};
