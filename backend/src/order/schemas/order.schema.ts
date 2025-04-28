import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  daytime: Date;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

const SessionSchema = new Schema<ISession>({
  _id: { type: String, required: true },
  daytime: { type: Date, required: true },
  hall: { type: String, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], default: [] },
});

export const SessionModel = model<ISession>('Session', SessionSchema);
