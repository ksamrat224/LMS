import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Book } from "./Books";
import { Image, ArrowLeft } from "lucide-react";
import { useBook } from "../context/bookContext";
import { object, string } from "yup";

const bookSchema=object({
  title: string().required("Title is required"),
  author: string().required("Author is required"),
  quantity: string().required("Quantity is required"),
  availability: string().required("Availability is required"),
})

const AddBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [base64IMG, setBase64IMG] = useState<string | ArrayBuffer | null>(null);
  const [bookData, setBookData] = useState<Book>();
  const { updateBookData } = useBook();
  const [errorMessage, setErrorMessage] = useState("");

  const convertToBase64 = (selectedFile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setBase64IMG(reader.result);
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const parsedFormValues = {
      ...formValues,
      quantity: parseInt(formValues.quantity as string, 10),
      availability: formValues.availability === "on",
      book_img: base64IMG || bookData?.book_img,
    };

    const url = id ? `/books/${id}` : "/books";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: parsedFormValues,
      });

      toast.success(`Book ${id ? "Updated" : "Added"} Successfully`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      updateBookData(parsedFormValues as Book);
      navigate("/book");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchBookFromId = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance(`/books/${id}`);
      setBookData(response.data);
      setBase64IMG(response.data.book_img);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchBookFromId();
  }, [id]);

  const handleBookChange = (e: any) => {
    const { name, value, checked, type, files } = e.target;

    if (name === "book_img" && files && files[0]) {
      convertToBase64(files[0]);
    } else {
      setBookData((prevData) => {
        const updatedData = {
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        };

        // Ensure required fields are not undefined
        return {
          ...updatedData,
          title: updatedData.title || "",
          author: updatedData.author || "",
          quantity: updatedData.quantity || 0,
          availability: updatedData.availability || false,
          book_img: updatedData.book_img || "",
        } as Book;
      });
    }
  };

  return (
    <div className="flex justify-center items-start py-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px] overflow-y-auto">
        <div className="mb-6">
          <div
            className="font-bold flex items-center cursor-pointer text-gray-700 mb-3"
            onClick={() => navigate("/book")}
          >
            <ArrowLeft size={18} />
            <span className="px-2">Back to books</span>
          </div>
          <h1 className="text-2xl font-bold text-center text-indigo-700">
            {id ? "Edit Book" : "Add New Book"}
          </h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              name="title"
              type="text"
              id="title"
              label="Title"
              value={bookData?.title || ""}
              onChange={handleBookChange}
            />
            <Input
              name="author"
              type="text"
              id="author"
              label="Author"
              value={bookData?.author || ""}
              onChange={handleBookChange}
            />
            <Input
              name="quantity"
              type="number"
              id="quantity"
              label="Quantity"
              value={bookData?.quantity || ""}
              onChange={handleBookChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="book_img"
              className="block text-sm font-medium text-gray-700"
            >
              <Image className="inline-block mr-2 text-gray-500" size={16} />
              Book Image
            </label>

            <div className="flex items-center gap-4 mt-1">
              <input
                type="file"
                id="book_img"
                name="book_img"
                accept="image/*"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
                onChange={handleBookChange}
              />

              {base64IMG || bookData?.book_img ? (
                <img
                  src={(base64IMG as string) || bookData?.book_img}
                  alt="Preview"
                  className="h-12 w-12 object-cover rounded-md"
                />
              ) : (
                <div className="text-gray-400 text-xs">No image</div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="availability"
              className="text-gray-700 text-sm font-bold"
            >
              Availability:
            </label>
            <input
              type="checkbox"
              id="availability"
              name="availability"
              className="mx-3 w-5 h-5 accent-indigo-700"
              checked={bookData?.availability || false}
              onChange={handleBookChange}
            />
          </div>
          <div className="h-6">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
          </div>
          <div className="sticky bottom-0  py-3 px-6  rounded-b-md text-center z-10">
            <Button
              label={id ? "Update Book" : "Add Book"}
              type="submit"
              bgColor="bg-indigo-700 hover:bg-indigo-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
