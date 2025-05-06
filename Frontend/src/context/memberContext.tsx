import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
//contextAPI-for global data management
//ThemeContext-for implementing dark/light mode toggle across the app
//Context Provider-stores and manipulates context data
//Context Consumer-uses context data in components
interface Member {
  name?: string;
  address?: string;
  email?: string;
  mobile?: number;
  id?: number;
}

interface MemberContextValues {
  memberData: Member[];
  onDelete: (id: number) => void;
  updateMemberData:(updatedMember:Member)=>void;
}
const MemberContext = createContext<MemberContextValues>({
  memberData: [],
  onDelete: () => {},
  updateMemberData: () => {},
});

const MemberProvider = ({ children }: { children: React.ReactElement }) => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const fetchMembers = async () => {
    try {
      const response = await axiosInstance(`/members`);
      console.log("response", response.data);
      setMemberData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const updateMemberData=(updatedBook:Member)=>{
    setMemberData([...memberData, updatedBook]);
  };
  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/members/${id}`);
      const newData = [...memberData].filter((member) => member.id !== id);
      setMemberData(newData);
      toast.success("Book deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error deleting book!", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const value = useMemo(() => ({ memberData, onDelete ,updateMemberData}), [memberData]);
  return <MemberContext.Provider value={value}>{children}</MemberContext.Provider>;
};
//custom hook that consumes the ThemeContext and returns the context value
const useMember = () => {
  const context = useContext(MemberContext);
  return context;
};
export { useMember, MemberProvider };
