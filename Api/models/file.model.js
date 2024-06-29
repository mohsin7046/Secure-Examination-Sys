import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);

export const PdfDetails = mongoose.model('PdfDetails', PdfDetailsSchema);