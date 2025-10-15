import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookForm.css";

const BookForm = ({ addBook }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const [publishDate, setPublishDate] = useState();
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handlePublishDateChange = (e) => {
    setPublishDate(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };

  let book = {
    name,
    author,
    genre,
    publishDate,
    description,
    price: Number(price),
    img,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !book.name ||
      !book.author ||
      !book.price ||
      !book.description ||
      !book.publishDate ||
      !book.genre ||
      !book.img
    )
      return alert("All fields required!");

    /*---------------------->price validation<---------------------------------- */

    if (isNaN(price) || price < 0) {
      alert(" Price must be a valid positive number.");
      return;
    }

    /*---------------------->date validation<---------------------------------- */
    const today = new Date().toISOString();
    if (book.publishDate === today) {
      return alert("Publication date cannot be today!");
    }

    /*-------------------------->sending Data<-------------------------- */
    try {
      const res = await fetch(
        "https://book-inventory-8c66d-default-rtdb.asia-southeast1.firebasedatabase.app/book.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        }
      );

      const data = await res.json();
      console.log("Book added:", data.name);
      const newBook = { id: data.name, ...book };
      addBook(newBook);
      navigate("/");
      setName("");
      setAuthor("");
      setGenre("");
      setPrice(0);
      setPublishDate("");
      setDescription("");
      setImg("");
    
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="book">
      <h2 className="title">Add a New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Book name"
          value={book.name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleAuthorChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={book.genre}
          onChange={handleGenreChange}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={book.price}
          onChange={handlePriceChange}
        />
        <input
          type="date"
          name="publishDate"
          placeholder="Enter The Date"
          className="dateInp"
          value={book.publishDate}
          onChange={handlePublishDateChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleDescriptionChange}
        />
        <input
          type="text"
          name="img"
          placeholder="img"
          value={book.img}
          onChange={handleImgChange}
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
