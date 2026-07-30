"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.getApiBaseUrl = getApiBaseUrl;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_js_1 = require("./models/user.js");
const team_js_1 = require("./models/team.js");
const activity_js_1 = require("./models/activity.js");
const leaderboard_js_1 = require("./models/leaderboard.js");
const workout_js_1 = require("./models/workout.js");
exports.app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`;
}
exports.app.use(express_1.default.json());
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        port: PORT,
        apiUrl: getApiBaseUrl(),
    });
});
exports.app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_js_1.User.find({}).lean();
    res.json(users);
});
exports.app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await user_js_1.User.create(req.body);
    res.status(201).json(user);
});
exports.app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_js_1.Team.find({}).lean();
    res.json(teams);
});
exports.app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await team_js_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_js_1.Activity.find({}).lean();
    res.json(activities);
});
exports.app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await activity_js_1.Activity.create(req.body);
    res.status(201).json(activity);
});
exports.app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_js_1.Leaderboard.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
exports.app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_js_1.Workout.find({}).lean();
    res.json(workouts);
});
exports.app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await workout_js_1.Workout.create(req.body);
    res.status(201).json(workout);
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        exports.app.listen(PORT, HOST, () => {
            console.log(`Backend listening on port ${PORT} on ${HOST}`);
            console.log(`API base URL: ${getApiBaseUrl()}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    void startServer();
}
