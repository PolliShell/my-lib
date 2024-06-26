import { useState, useEffect } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";

const AddBookForm = () => {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publicationYear: "",
    author_id: "",
    coverImage: null,
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get("/authors/");
        setAuthors(response.data);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "publicationYear" ? Number(value) : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("publicationYear", formData.publicationYear);
      form.append("author_id", formData.author_id);
      form.append("coverImage", formData.coverImage);

      await axiosInstance.post(`http://localhost:3000/shop/add-book`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book added successfully!");
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div>
      <h1>Add a Book</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="publicationYear">Publication Year:</label>
        <input
          type="number"
          id="publicationYear"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          required
        />

        <label htmlFor="author_id">Author:</label>
        <select
          id="author_id"
          name="author_id"
          value={formData.author_id}
          onChange={handleChange}
          required
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.full_name}
            </option>
          ))}
        </select>

        <label htmlFor="coverImage">Cover Image:</label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBookForm;
