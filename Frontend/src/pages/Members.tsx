import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PencilIcon, TrashIcon } from "lucide-react";
import Modal from "../components/Modal";
import { useMember } from "../context/memberContext";
export interface Member {
  name?: string;
  address?: string;
  email?: string;
  mobile?: number;
  id?: number;
}

const Members = () => {
  const { memberData, onDelete } = useMember();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleDelete = async () => {
    if (selectedMemberId) {
      onDelete(selectedMemberId);
    }
    setIsModelOpen(false);
  };
  const openModel = (id: number) => {
    setIsModelOpen(true);
    setSelectedMemberId(id);
  };
  const closeModel = () => {
    setIsModelOpen(false);
    setSelectedMemberId(null);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Header */}
      <header className="py-6 text-center bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <p className="text-lg mt-2">
          Members in our library
        </p>
        <div className="mt-4 flex justify-end pr-6 space-x-4">
          <Button
            label="Add Member"
            type="button"
            onClick={() => navigate("/add-member")}
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Mobile
                </th>
               
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((member: any, index: number) => (
                <tr
                  key={member.id}
                  className={`h-20 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 font-bold truncate">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 truncate">
                    {member.address}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300 truncate">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    {member.mobile}
                  </td>
                  
                  <td className="px-6 py-4 text-gray-900 border border-gray-300">
                    <div className="flex space-x-4">
                      <PencilIcon
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigate(`/edit-member/${member.id}`)}
                      />
                      <TrashIcon
                        className="text-red-600 cursor-pointer"
                        onClick={() => openModel(member.id as number)}
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

export default Members;
