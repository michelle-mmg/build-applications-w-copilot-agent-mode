import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  name: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
