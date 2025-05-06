import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Book } from "./Books";
import { Image, ArrowLeft } from "lucide-react";
import { useMember } from "../context/memberContext";
import { Member } from "./Members";

const AddBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [memberData, setMemberData] = useState<Member>();
  const {updateMemberData} = useMember();
  const [errorMessage, setErrorMessage] = useState("");

 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const url = id ? `/members/${id}` : "/members";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: formValues,
      });

      toast.success(`Member ${id ? "Updated" : "Added"} Successfully`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      updateMemberData(formValues as Member);
      navigate("/member");
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

  const fetchMemberFromId = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance(`/members/${id}`);
      setMemberData(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  useEffect(() => {
    fetchMemberFromId();
  }, [id]);

  const handleBookChange = (e: any) => {
    const {  } = e.target;

    
  };

  return (
    <div className="flex justify-center items-start py-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px] overflow-y-auto">
        <div className="mb-6">
          <div
            className="font-bold flex items-center cursor-pointer text-gray-700 mb-3"
            onClick={() => navigate("/member")}
          >
            <ArrowLeft size={18} />
            <span className="px-2">Back to Member</span>
          </div>
          <h1 className="text-2xl font-bold text-center text-indigo-700">
            {id ? "Edit Member" : "Add New Member"}
          </h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              name="title"
              type="text"
              id="title"
              label="Title"
              value={memberData?.title || ""}
              onChange={handleBookChange}
            />
            <Input
              name="author"
              type="text"
              id="author"
              label="Author"
              value={memberData?.author || ""}
              onChange={handleBookChange}
            />
            <Input
              name="quantity"
              type="number"
              id="quantity"
              label="Quantity"
              value={memberData?.quantity || ""}
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
              checked={memberData?.availability || false}
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
              label={id ? "Update Member" : "Add Member"}
              type="submit"
              bgColor="bg-indigo-700 hover:bg-indigo-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
