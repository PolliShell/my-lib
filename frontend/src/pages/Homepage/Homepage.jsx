import "./Homepage.css";
import { Navbar } from "../../components/Navbar/Navbar";
// import { PopularBooks } from "../../sections/PopularBooks/PopularBooks";
import { BookPreview } from "../../components/BookPreview/BookPreview";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <main className="main container">
        <section className="popular-books">
          <h2>Популярні книги</h2>
          <div className="books">
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
          </div>
        </section>
        <section className="stock-books">
          <h2>Акційні книги</h2>
          <div className="books">
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
            <BookPreview />
          </div>
        </section>
        {/* <PopularBooks /> */}
      </main>
    </>
  );
};
