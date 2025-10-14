import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./BookList.css"

const BookList = ({ books, onDelete,  }) => {
const navigate = useNavigate();
 

const editHandle=(id)=>{
 navigate(`/edit/${id}`);
  }


  return (

    <div className={"bookList"} >

      <table style={{ width: "100%", borderCollapse: "collapse" }}>

   {/* -------------------------------->table<--------------------------*/}
        <thead>
          <tr>
            <th className={"thStyle"}>Image</th>
            <th className={"thStyle"} >Title</th>
            <th className={"thStyle"}>Author</th>
            <th className={"thStyle"}>Genre</th>
            <th className={"thStyle"}>Publish Date</th>
            <th className={"thStyle"} >Price</th>
            <th className={"thStyle"}>Actions</th>
          </tr>
        </thead>

   {/* -------------------------------->table body <--------------------------*/}
        <tbody>
          {books.map((book) => (

            <tr key={book.id} className={"trStyle"}>
              <td className={"tdStyle"}>
                <img src={book.img} alt={book.name}
                  style={{ width: "50px", height: "70px", objectFit: "cover" }}
                />
              </td>

              <td className={"tdStyle"}>{book.name}</td>
              <td className={"tdStyle"}>{book.author}</td>
              <td className={"tdStyle"}>{book.genre}</td>
              <td className={"tdStyle"}>{book.publishDate}</td>
              <td className={"tdStyle"}>${book.price}</td>
              <td className={"tdStyle"}>


                {/* -------------------------------->Details Button <--------------------------*/}
                <Link to={`/book/${book.id}`}>
                  <button className={"actionBtn"} style={{  backgroundColor: "#4CAF50" }} >
                    Details
                  </button>
                </Link>

                {/* ------------------------->Edit Button<-------------------------------- */}
                <button onClick={() => editHandle(book.id)}  className={"actionBtn"} style={{  backgroundColor: "#2196F3" }} >
                  Edit
                </button>

                {/* ----------------------> Delete Button<----------------------------------- */}
                <button  onClick={() => onDelete(book.id)} className={"actionBtn"} style={{  backgroundColor: "red" }} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
