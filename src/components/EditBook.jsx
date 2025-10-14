import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBook.css"

const EditBook = ({ books, updateBook }) => {

  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);



  const[name,setName]=useState("");
  const[author,setAuthor]=useState("");
  const[genre,setGenre]=useState("");
  const[price,setPrice]=useState(0);
  const[publishDate,setPublishDate]=useState();
  const[description,setDescription]=useState("");
  const[img,setImg]=useState("");


  useEffect(() => {
    if (book) {
      setName(book.name);
      setAuthor(book.author);
      setGenre(book.genre);
      setPrice(book.price);
      setPublishDate(book.publishDate);
      setDescription(book.description);
      setImg(book.img);
    }
  }, [book]);


const handleNameChange=(e)=>{
setName(e.target.value)
};

const handleAuthorChange=(e)=>{
setAuthor(e.target.value)
}
const handleGenreChange=(e)=>{
setGenre(e.target.value)
}

const handlePriceChange=(e)=>{
setPrice(e.target.value)
}
const handlePublishDateChange=(e)=>{
setPublishDate(e.target.value)
}
const handleDescriptionChange=(e)=>{
setDescription(e.target.value)
}

const handleImgChange=(e)=>{
setImg(e.target.value)
}



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(price) || price < 0) {
      alert(" Price must be a valid positive number.");
      return;
    }


   const updatedBook = {
      id: book.id,
      name,
      author,
      genre,
      price: Number(price),
      publishDate,
      description,
      img,
    };


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

        <input type="text" name="name" placeholder="Book name" value={name} onChange={handleNameChange} />
        <input type="text" name="author" placeholder="Author"  value={author}  onChange={handleAuthorChange}/>
        <input type="text" name="genre"  placeholder="Genre" value={genre} onChange={handleGenreChange}/>
        <input type="number" name="price" placeholder="Price" value={price} onChange={handlePriceChange} />
        <input type="date"name="publishDate"  className="eDateInp"value={publishDate}onChange={handlePublishDateChange} />
        <input type="text" name="description"placeholder="Description"value={description}onChange={handleDescriptionChange} />
        <input type="text" name="img" placeholder="Image URL" value={img} onChange={handleImgChange} />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
