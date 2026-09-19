import { useNavigate } from "react-router-dom";

export default function NotFound() {
  
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh p-10">
      <a onClick={() => navigate("/")} className="uppercase font-bold border-b-2 cursor-pointer hover:text-cc-green-3 transition-colors duration-200">Bug Reporter</a>
      <p className="mt-4 font-mono text-center"><strong className="text-cc-green-2">Error 404:</strong> Page Not Found</p>
    </div>
  );
}