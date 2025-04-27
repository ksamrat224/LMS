import Button from "../components/Button";
import Input from "../components/Input";

const AddBook = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 tracking-tight flex items-center justify-center gap-2">
          Add a New Book
        </h1>
        <form className="space-y-6">
          {/* Title Input */}
          <Input
            name="title"
            type="text"
            id="title"
            label="Title"
          />
          {/* Author Input */}
          <Input
            name="author"
            type="text"
            id="author"
            label="Author"
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
            label="Book Image URL"
          />
          {/* Availability Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="availability"
              className="text-gray-700 font-medium"
            >
              Available
            </label>
          </div>
          {/* Submit Button */}
          <div className="pt-4">
            <Button
              label="➕ Add Book"
              type="submit"
              bgColor="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;