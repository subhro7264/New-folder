import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = ({ books }) => {
  const { id } = useParams();
  console.log(id);
  
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);

  if (!book) return <h2>Book not found!</h2>;

  return (
    <>
    <div  style={{
        margin:"20px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor:"#8ecae6",
        borderRadius:"5px"

      }} >
      
      <h1>{book.name}</h1>
      <img src={book.img} alt={book.name} style={{ width: "200px" }} />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Publish Date:</strong> {book.publishDate}
      </p>
      <p>
        <strong>Price:</strong> ${book.price}
      </p>

      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
    </>
  );
};

export default BookDetails;
