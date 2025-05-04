import { toast } from "sonner";
import { CheckCircle, TriangleAlert } from "lucide-react"; 

const MyToast = (message, type) => {
  if (type === "success") {
    toast.success(`😀 ${message}`, {
      theme: "colored",
      style: { backgroundColor: "#1d4ed8", color: "#fff", fontSize: "16px" },
      icon:<CheckCircle size={22} color="white" /> 
    });
  } else {
    toast.info(`😔 ${message}`, {
      theme: "colored",
      style: { backgroundColor: "#ff003d", color: "#fff", fontSize: "16px" },
      icon: <TriangleAlert size={22} color="white" />
    });
  }
};

export default MyToast;