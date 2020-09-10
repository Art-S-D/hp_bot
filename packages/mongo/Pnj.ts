import mongoose = require("mongoose");

export interface IPnj extends mongoose.Document {
  name: string;
  house: string;
  year: string;
  description?: string;
  picture?: string;
}

const PnjSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  house: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: false },
  picture: { type: String, required: false },
});

export const Pnj = mongoose.model<IPnj>("Pnj", PnjSchema);
