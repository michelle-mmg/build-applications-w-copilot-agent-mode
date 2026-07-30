import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  date: string;
  userId: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
