import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
// import fileRoutes from './routes/file.route.js'
import multer from 'multer';
import { PdfDetails } from './models/file.model.js';

dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Database is connected');
})

const app = express();
app.use(express.json());
app.use("/files", express.static("files"));


app.use('/Api/user',userRoutes);
app.use('/Api/auth',authRoutes);
// app.use('/Api/file',fileRoutes);

//index file
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database for files");
  })
  .catch((e) => console.log(e));


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });

  
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });


app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});



app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});
app.get("/", async (req, res) => {
    res.send("Success!!!!!!");
  });

  app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message || "Server Errror"

    res.status(statusCode).json({
       success:false,
       statusCode,
       message
    })
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
