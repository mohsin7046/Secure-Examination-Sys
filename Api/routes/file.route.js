import express from 'express';
import { PdfDetails } from '../models/file.model.js';
import { upload } from '../middleware/multer.middleware.js';



const router = express.Router();

router.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
      await PdfDetails.create({ title: title, pdf: fileName });
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });


  router.get("/get-files", async (req, res) => {
    try {
      PdfDetails.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });


  router.get("/", async (req, res) => {
      res.send("Success!!!!!!");
    });
  
//     app.listen(3000,()=>{
//       console.log("Server is running on port 3000");
//   })


  export default router;