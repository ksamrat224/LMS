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
const BookContext = createContext<MemberContextValues>({
  memberData: [],
  onDelete: () => {},
  updateMemberData: () => {},
});

const MemberProvider = ({ children }: { children: React.ReactElement }) => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      console.log("response", response.data);
      setMemberData(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const updateBookData=(updatedBook:Member)=>{
    setMemberData([...memberData, updatedBook]);
  };
  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      const newData = [...bookData].filter((book) => book.id !== id);
      setBookData(newData);
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
    fetchBooks();
  }, []);

  const value = useMemo(() => ({ bookData, onDelete ,updateBookData}), [bookData]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
//custom hook that consumes the ThemeContext and returns the context value
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
