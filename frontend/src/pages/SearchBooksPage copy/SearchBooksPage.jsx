import s from "./SearchBooksPage.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookList } from "../../components/BookList/BookList";

export const SearchBooksPage = () => {
  return (
    <>
      <Navbar />
      <main className={`${s.main} container`}>
        <BookList type="titleSearch" />
      </main>
    </>
  );
};
