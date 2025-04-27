import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

interface Book {
  title: string;
  author: string;
  id: number;
  quantity: number;
  availability:boolean;
  book_img: string;
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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <header className="py-6 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">Library Books</h1>
        <p className="text-lg mt-2">Explore the collection of books in our library</p>
      </header>

      {/* Table Container */}
      <div className="flex-grow overflow-auto">
        <div className="h-full">
          <table className="w-full h-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border-b">
                  Published Year
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
                  <td className="px-6 py-4 text-gray-900 border-b">{book.id}</td>
                  <td className="px-6 py-4 text-gray-900 border-b">{book.title}</td>
                  <td className="px-6 py-4 text-gray-900 border-b">{book.author}</td>
                  <td className="px-6 py-4 text-gray-900 border-b">{book.publishedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <p className="text-sm text-white">© 2025 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Books;