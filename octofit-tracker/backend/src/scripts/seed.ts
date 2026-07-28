import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        role: 'captain',
        fitnessGoal: 'Improve endurance',
      },
      {
        name: 'Noah Patel',
        email: 'noah@example.com',
        role: 'member',
        fitnessGoal: 'Build strength',
      },
      {
        name: 'Mia Rodriguez',
        email: 'mia@example.com',
        role: 'member',
        fitnessGoal: 'Increase flexibility',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Night Riders',
        sport: 'Cycling',
        memberCount: 6,
        captain: users[0].name,
      },
      {
        name: 'Peak Performers',
        sport: 'Running',
        memberCount: 8,
        captain: users[1].name,
      },
    ]);

    await Activity.insertMany([
      {
        type: 'run',
        durationMinutes: 35,
        date: '2026-07-28',
        userId: users[0]._id.toString(),
      },
      {
        type: 'strength',
        durationMinutes: 45,
        date: '2026-07-27',
        userId: users[1]._id.toString(),
      },
      {
        type: 'yoga',
        durationMinutes: 30,
        date: '2026-07-26',
        userId: users[2]._id.toString(),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: users[0].name, points: 1250, rank: 1 },
      { userId: users[1]._id.toString(), name: users[1].name, points: 1120, rank: 2 },
      { userId: users[2]._id.toString(), name: users[2].name, points: 980, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Circuit',
        difficulty: 'moderate',
        durationMinutes: 25,
        focus: 'cardio',
      },
      {
        title: 'Core Builder',
        difficulty: 'easy',
        durationMinutes: 20,
        focus: 'strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
