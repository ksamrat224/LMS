import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Book } from "./Books";

const AddBook = () => {
  const navigate = useNavigate();
  const [base64IMG, setBase64IMG] = useState<string | ArrayBuffer | null>(null);
  const [bookData, setBookData] = useState<Book>({
    title: "",
    author: "",
    quantity: 0,
    book_img: "",
    availability: false,
  });
  const { id } = useParams();
  const convertToBase64 = (selectedfile: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    reader.onloadend = () => {
      console.log("Base64 Image: ", reader.result);
      setBase64IMG(reader.result);
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const parsedFormValues = {
      ...formValues,
      quantity: parseInt(formValues?.quantity as string, 10),
      availability: formValues?.availability === "on",
      book_img: base64IMG||bookData?.book_img,//use the base 64 image or existing image 
    };
    const url = id ? `/books/${id}` : "/books";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
        },
      });

      toast.success("Book Added Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate("/book"); // Redirect to the books page after successful addition
    } catch (err: any) {
      console.log(err);
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
    try {
      const response = await axiosInstance(`/books/${id}`); // Adjust the endpoint as needed
      setBookData({ ...response.data, availability: true });
      setBase64IMG(response.data.book_img);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookFromId();
    }
  }, [id]);

  const handleBookDataChange = (e: any) => {
    const { name, value, checked,type,files } = e.target;
    if(name==="book_img" && files && files[0]) {
      convertToBase64(files[0]);
    } else{
      setBookData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 tracking-tight">
          Add a New Book
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <Input
            name="title"
            type="text"
            id="title"
            label="Title"
            required={true}
            value={bookData?.title}
            onChange={handleBookDataChange}
          />
          {/* Author Input */}
          <Input
            name="author"
            type="text"
            id="author"
            label="Author"
            required={true}
            value={bookData?.author}
            onChange={handleBookDataChange}
          />
          {/* Quantity Input */}
          <Input
            name="quantity"
            type="number"
            id="quantity"
            label="Quantity"
            value={bookData?.quantity}
            onChange={handleBookDataChange}
          />
          {/* Book Image Input */}
          <Input
            name="book_img"
            type="text"
            id="book_img"
            label="Book Image"
            required={false}
            value={bookData?.book_img}
            onChange={handleBookDataChange}
          />
          {/* Availability Checkbox */}
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
              className="mx-3 w-5 h-5"
              checked={bookData?.availability}
              onChange={handleBookDataChange}
            />
          </div>
          {/* Submit Button */}
          <Button
            label={id ? "Edit Book" : "Add Book"}
            type="submit"
            bgColor="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
          />
        </form>
        <div className="mt-4 text-center">
          <Button
            label="Back to Books"
            type="button"
            onClick={() => navigate("/book")}
            bgColor="bg-gray-500 hover:bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBook;
