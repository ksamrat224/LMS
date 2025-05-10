import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { TrashIcon } from "lucide-react";
import Modal from "../components/Modal";
import { useMember } from "../context/memberContext";
import { axiosInstance } from "../utils/axiosInterceptor";
import { useBook } from "../context/bookContext";

type Transaction_Type = "borrow" | "return";

interface Transaction {
  id: number;
  book_id: number;
  member_id: number;
  transaction_date: string;
  type: Transaction_Type;
}

const Transactions = () => {
  const { onDelete } = useMember();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const {bookData} = useBook();
  const {memberData} = useMember();

  const handleDelete = async () => {
    if (selectedTransactionId) {
      onDelete(selectedTransactionId);
    }
    setIsModelOpen(false);
  };
  const openModel = (id: number) => {
    setIsModelOpen(true);
    setSelectedTransactionId(id);
  };
  const closeModel = () => {
    setIsModelOpen(false);
    setSelectedTransactionId(null);
  };

  const navigate = useNavigate();
  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance(`/transactions`);
      console.log(response.data, "response.data");
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);
  const renderBookTitle = (bookId: number) => {
    const book = bookData.find((book) => book.id === bookId);
    return book ? book.title : "Unknown Book";
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <header className="py-6 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <p className="text-lg mt-2">Transactions in our library</p>
        <div className="mt-4 flex justify-end pr-6 space-x-4">
          <Button
            label="Add Transaction"
            type="button"
            onClick={() => navigate("/add-transaction")}
            bgColor="bg-green-600 hover:bg-green-700"
          />
        </div>
      </header>

      {/* Table Container */}
      <div className="flex-grow overflow-auto">
        <div className="h-full">
          <table className="w-full table-fixed bg-white border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gray-200 bg-gradient-to-1 from-indigo-700 to-purple-600">
              <tr className="bg-gray-100 text-gray-700 ">
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction: any, index: number) => (
                <tr
                  key={transaction.id}
                  className={`h-20 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 font-bold truncate">
                    {transaction.book_id}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 truncate">
                    {transaction.member_id}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 truncate">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {transaction.transaction_date
                      ? new Date(
                          transaction.transaction_date
                        ).toLocaleDateString("en-CA")
                      : ""}
                  </td>

                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    <div className="flex space-x-4">
                      <TrashIcon
                        className="text-red-600 cursor-pointer"
                        onClick={() => openModel(transaction.id as number)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isModelOpen={isModelOpen}
        onClose={closeModel}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Transactions;
