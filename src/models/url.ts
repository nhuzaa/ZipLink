import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
}

const urlSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }
});

export default mongoose.model<IUrl>('Url', urlSchema);

