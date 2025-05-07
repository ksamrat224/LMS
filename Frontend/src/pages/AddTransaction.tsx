import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {  ArrowLeft } from "lucide-react";
import { useBook } from "../context/bookContext";
import { Transaction } from "./Transactions";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState<Transaction>();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const {bookData}=useBook();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);

    const url = id ? `/members/${id}` : "/members";
    console.log(parsedFormValues, "parsedFormValues");

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          book_id: parsedFormValues.book_id,
          member_id: parsedFormValues.member_id,
        },
      });

      toast.success(`Transaction Added Successfully`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      
      navigate("/transaction");
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

  const fetchTransactionFromId = async () => {
    try {
      const response = await axiosInstance(`/transactions/${id}`);
      setTransactionData({...response.data,availability:true});
    } catch (error) {
      console.error("Error fetching Transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactionFromId();
  }, [id]);

  const handleTransactionChange = (e: any) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({
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
            onClick={() => navigate("/transaction")}
          >
            <ArrowLeft size={18} />
            <span className="px-2">Back to Transaction</span>
          </div>
          <h1 className="text-2xl font-bold text-center text-indigo-700">
            {id ? "Edit Transaction" : "Add New Transaction"}
          </h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              name="name"
              type="text"
              id="name"
              label="Name"
              value={transactionData?.name || ""}
              onChange={handleTransactionChange}
            />
            <Input
              name="address"
              type="text"
              id="address"
              label="Address"
              value={transactionData?.address || ""}
              onChange={handleTransactionChange}
            />
            <Input
              name="email"
              type="email"
              id="email"
              label="Email"
              value={transactionData?.email || ""}
              onChange={handleTransactionChange}
            />
            <Input
              name="mobile"
              type="tel"
              id="mobile"
              label="Mobile"
              value={transactionData?.mobile || ""}
              onChange={handleTransactionChange}
            />
          </div>

          <div className="h-6">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
          </div>

          <div className="sticky bottom-0 py-3 px-6 rounded-b-md text-center z-10">
            <Button
              label={id ? "Update Transaction" : "Add Transaction"}
              type="submit"
              bgColor="bg-indigo-700 hover:bg-indigo-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
