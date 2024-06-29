import { useEffect, useState } from "react";
import axios from 'axios'
import { pdfjs } from "react-pdf";
import PdfComp from "../components/PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get(`http://localhost:${import.meta.env.PORT}/get-files`);
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    setTitle("")
    alert("PDF Submit SuccessFully");
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      `http://localhost:${import.meta.env.PORT}/upload-files`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  }
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:${import.meta.env.PORT}/files/${pdf}`)
  }
  
  return (
    <div className="App container mx-auto p-4">
    <form 
      action="/upload-file" 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
      onSubmit={submitImage} 
      encType="multipart/form-data"
    >
      <h4 className="text-xl font-bold mb-4">Upload Pdf in React</h4>
      <div className="mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>

  
  </div>
  );
}

export default Upload;