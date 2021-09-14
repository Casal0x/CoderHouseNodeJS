import { Schema, model } from 'mongoose';

const MensajeSchema = new Schema({
  email: String,
  text: String,
  time: String,
});

export default model('mensaje', MensajeSchema);
