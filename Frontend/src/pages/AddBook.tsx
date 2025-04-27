import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent } from "react";

const AddBook = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);

    try {
      const response = await axiosInstance(`/books`, {
        method: "POST",
        data: {
          ...parsedFormValues,
          quantity: parseInt(parsedFormValues?.quantity, 10),
          availability: parsedFormValues?.availability === "on",
        },
      });
      console.log(response.data);

      toast.success("Book Added Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
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
          />
          {/* Author Input */}
          <Input
            name="author"
            type="text"
            id="author"
            label="Author"
            required={true}
          />
          {/* Quantity Input */}
          <Input
            name="quantity"
            type="number"
            id="quantity"
            label="Quantity"
          />
          {/* Book Image Input */}
          <Input
            name="book_img"
            type="text"
            id="book_img"
            label="Book Image"
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
            />
          </div>
          {/* Submit Button */}
          <Button
            label="Add Book"
            type="submit"
            bgColor="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBook;