"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_js_1 = require("./models/user.js");
const team_js_1 = require("./models/team.js");
const activity_js_1 = require("./models/activity.js");
const leaderboard_js_1 = require("./models/leaderboard.js");
const workout_js_1 = require("./models/workout.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        port: PORT,
        apiUrl: getApiBaseUrl(),
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await user_js_1.User.find({}).lean();
    res.json(users);
});
app.post('/api/users/', async (req, res) => {
    const user = await user_js_1.User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await team_js_1.Team.find({}).lean();
    res.json(teams);
});
app.post('/api/teams/', async (req, res) => {
    const team = await team_js_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await activity_js_1.Activity.find({}).lean();
    res.json(activities);
});
app.post('/api/activities/', async (req, res) => {
    const activity = await activity_js_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_js_1.Leaderboard.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_js_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await workout_js_1.Workout.create(req.body);
    res.status(201).json(workout);
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
            console.log(`API base URL: ${getApiBaseUrl()}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
