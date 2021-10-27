import mongoose, { Document, Schema } from 'mongoose';

export interface iPalette extends Document {
  userId: string;
  name: string;
  colors: [string];
  description: string;
}

const paletteSchema = new Schema<iPalette>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Palette = mongoose.model('Palette', paletteSchema);

export default Palette;
