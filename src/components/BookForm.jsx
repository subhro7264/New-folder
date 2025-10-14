import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookForm.css";




const BookForm = ({addBook}) => {
  const navigate = useNavigate();
 
  const [book, setBook] = useState({ name: "",author: "", publishDate: "",description: "",price: 0,img: "",});



  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !book.name || !book.author ||!book.price ||  !book.description ||!book.publishDate || !book.genre || !book.img )
      return alert("All fields required!");

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
      console.log("Book added:",data.name);
      const newBook = { id: data.name, ...book };
      addBook(newBook);
      navigate("/");
      setBook({ name: "", author: "", publishDate: "",  description: "",img: "", price: 0, });

    } catch (error) {
      console.error("Error adding book:", error);
    }




  };

  return (
    <div className="book">

      <h2 className="title">Add a New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>

        <input type="text" name="name" placeholder="Book name" value={book.name} onChange={handleChange} />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} />
        <input type="text" name="genre" placeholder="genre" value={book.genre} onChange={handleChange} />
        <input type="number"name="price" placeholder="price" value={book.price} onChange={handleChange} />
        <input type="date" name="publishDate" placeholder="Enter The Date" className="dateInp"  value={book.publishDate} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={book.description} onChange={handleChange}  />
        <input type="text" name="img" placeholder="img" value={book.img} onChange={handleChange} />

        <button type="submit">Add Book</button>

      </form>
    </div>
  );
};

export default BookForm;
