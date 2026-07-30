import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  memberCount: number;
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  memberCount: { type: Number, required: true },
  captain: { type: String, required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
