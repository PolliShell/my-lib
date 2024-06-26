import s from "./Homepage.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookList } from "../../components/BookList/BookList";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <main className={`${s.main} container`}>
        <BookList type="homepage" />
      </main>
    </>
  );
};
