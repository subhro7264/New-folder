import React, { useState, useEffect } from "react";
import {Routes, Route,Link} from "react-router-dom";
import BookList from "./components/BookList";

import BookDetails from "./components/BookDetails"; 
import BookForm from "./components/BookForm";
import EditBook from "./components/EditBook";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://mocki.io/v1/5937de5f-021b-420d-ad53-ce0ed6aa26fc"
  //       );
  //       const data = await response.json();

  //       const formattedBooks = data.map((book) => ({
  //         id: book.id,
  //         name: book.title,
  //         author: book.author,
  //         publishDate: book.publishDate,
  //         price: book.price,
  //         genre: book.genre,
  //         image: book.image,
  //       }));

  //       setBooks(formattedBooks);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load books");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBooks();
  // }, []);



  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://book-inventory-8c66d-default-rtdb.asia-southeast1.firebasedatabase.app/book.json"
        );
        const data = await res.json();
        if (data) {
     
          const loadedBooks = Object.entries(data).map(([name, value]) => ({
        
            id:name,
            ...value,
          }));
          setBooks(loadedBooks);
          setLoading(false);
          console.log(loadedBooks,"object from array");
          
        } else {
          setBooks([]); 
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Error fetching books:")
         setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  /*---------------------> delete<------------------------------- */

const deleteBook = async (id) => {

    await fetch(
      `https://book-inventory-8c66d-default-rtdb.asia-southeast1.firebasedatabase.app/book/${id}.json`,
      { method: "DELETE" }
    );
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };
  


const newBook=(book)=>{
setBooks((pre)=>[...pre,book])
}

const updateBook = (updatedBook) => {
  setBooks((prev) =>
    prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
  );
};


  if (loading) return <h2>Loading books...</h2>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
 <>
 
      <Routes>
       
        <Route
          path="/"
          element={
            <div className="app">
               <h1> Book Inventory</h1>
              
              <button className="AddBtn"><Link to={"/AddBook"}>Add New Book</Link></button>
             <BookList books={books} onDelete={deleteBook} />

            </div>
          }
        />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
        <Route path="/AddBook" element={<BookForm addBook={newBook}/>}/>
        <Route path="/edit/:id" element={<EditBook books={books} updateBook={updateBook} />} />

        
      </Routes>
      </>
    
  );
};

export default App;
