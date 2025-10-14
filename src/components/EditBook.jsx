import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBook.css"

const EditBook = ({ books, updateBook }) => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);

  const [updatedBook, setUpdatedBook] = useState({ name: "", author: "", genre: "", publishDate: "", description: "", price: 0,img: "",});

  useEffect(() => {
    if (book) {
      setUpdatedBook(book);
    }
  }, [book]);

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://book-inventory-8c66d-default-rtdb.asia-southeast1.firebasedatabase.app/book/${book.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        }
      );

      const data = await res.json();

      console.log(" Book updated:", data);
      updateBook(updatedBook);

      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="EditContainer">
      <h2 className={"etitle"}>Edit Book Details</h2>

      <form className="book-form" onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder="Book name" value={updatedBook.name} onChange={handleChange} />
        <input type="text" name="author" placeholder="Author"  value={updatedBook.author}  onChange={handleChange}/>
        <input type="text" name="genre"  placeholder="Genre" value={updatedBook.genre} onChange={handleChange}/>
        <input type="number" name="price" placeholder="Price" value={updatedBook.price} onChange={handleChange} />
        <input type="date"name="publishDate"  className="eDateInp"value={updatedBook.publishDate}onChange={handleChange} />
        <input type="text" name="description"placeholder="Description"value={updatedBook.description}onChange={handleChange} />
        <input type="text" name="img" placeholder="Image URL" value={updatedBook.img} onChange={handleChange} />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
