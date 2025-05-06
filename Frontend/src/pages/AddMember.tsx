import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {  ArrowLeft } from "lucide-react";
import { useMember } from "../context/memberContext";
import { Member } from "./Members";

const AddMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [memberData, setMemberData] = useState<Member>();
  const { updateMemberData } = useMember();
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

  const handleMemberChange = (e: any) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              name="name"
              type="text"
              id="name"
              label="Name"
              value={memberData?.name || ""}
              onChange={handleMemberChange}
            />
            <Input
              name="address"
              type="text"
              id="address"
              label="Address"
              value={memberData?.address || ""}
              onChange={handleMemberChange}
            />
            <Input
              name="email"
              type="email"
              id="email"
              label="Email"
              value={memberData?.email || ""}
              onChange={handleMemberChange}
            />
            <Input
              name="mobile"
              type="tel"
              id="mobile"
              label="Mobile"
              value={memberData?.mobile || ""}
              onChange={handleMemberChange}
            />
          </div>

          <div className="h-6">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
          </div>

          <div className="sticky bottom-0 py-3 px-6 rounded-b-md text-center z-10">
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
