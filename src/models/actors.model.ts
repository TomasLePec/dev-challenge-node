import { model, Schema, Document } from 'mongoose';
import { IActor } from '../interfaces/actors.interface';

const actorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const actorModel = model<IActor & Document>('actors', actorSchema);

export default actorModel;
