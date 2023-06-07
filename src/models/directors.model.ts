import { model, Schema, Document } from 'mongoose';
import { IDirector } from '../interfaces/directors.interface';

const directorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
});

const directorModel = model<IDirector & Document>('directors', directorSchema);

export default directorModel;
