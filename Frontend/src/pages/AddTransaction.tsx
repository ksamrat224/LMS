import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {  ArrowLeft } from "lucide-react";
import { useBook } from "../context/bookContext";
import { useMember } from "../context/memberContext";

type Transaction_Type = "borrow" | "return";

export interface Transaction {
  
  id?: number;
  book_id?: number;
  member_id?: number;
  transaction_date?: string;
  type:Transaction_Type;

}

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState<Transaction>();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const {bookData}=useBook();
  const {memberData}=useMember();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);

    const url = id ? `/transactions/${id}` : "/transactions";
    console.log(parsedFormValues, "parsedFormValues");

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          book_id: parseInt(parsedFormValues.book_id,10),
          member_id:parseInt( parsedFormValues.member_id,10),
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
      const formattedDate = response.data.transaction_date?new Date(response.data.transaction_date).toISOString().split("T")[0]:"";
      setTransactionData({...response.data, transaction_date: formattedDate });
    } catch (error) {
      console.error("Error fetching Transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactionFromId();
  }, [id]);

  const handleTransactionChange = (e:React.ChangeEvent<HTMLImageElement | HTMLSelectElement>) => {
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
            <label htmlFor="book" className="block text-lg font-bold text-gray-700">Book</label>
            <select
              id="book"
              name="book_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionChange}
            >
              {bookData.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            <label
              htmlFor="member"
              className="block text-lg font-bold text-gray-700"
            >
              Member
            </label>
            <select
              id="member"
              name="member_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionChange}
            >
              {memberData.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="type"
              className="block text-lg font-bold text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionChange}
            >
              <option value={"borrow"}>Borrow</option>
              <option value={"return"}>Return</option>
            </select>
           
            <Input
              name="data"
              type="date"
              id="date"
              label="Date"
              value={transactionData?.transaction_date || ""}
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
