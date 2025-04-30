import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PencilIcon, TrashIcon } from "lucide-react";

export interface Book {
  title?: string;
  author?: string;
  id?: number;
  quantity?: number;
  availability?: boolean;
  book_img?: string;
}

const Books = () => {
  const [data, setData] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance("/books"); // Adjust the endpoint as needed
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <header className="py-6 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">Library Books</h1>
        <p className="text-lg mt-2">
          Explore the collection of books in our library
        </p>
        <div className="mt-4 flex justify-end pr-6 space-x-4">
          <Button
            label="Add Book"
            type="button"
            onClick={() => navigate("/add-book")}
            bgColor="bg-green-600 hover:bg-green-700"
          />
        </div>
      </header>

      {/* Table Container */}
      <div className="flex-grow overflow-auto">
        <div className="h-full">
          <table className="w-full h-full bg-white border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Book Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((book: any, index: number) => (
                <tr
                  key={book.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 font-bold">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {book.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {book.book_img ? (
                      <img
                        src={book.book_img}
                        alt={book.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No Image Available"
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {book.availability ? (
                      <span className="text-green-600 font-semibold">
                        Available
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Not Available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    <div className="flex space-x-4">
                      <PencilIcon
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate(`/edit-book/${book.id}`)}
                      />
                      <TrashIcon className="text-red-600 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
