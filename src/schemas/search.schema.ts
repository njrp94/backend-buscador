import { Schema } from 'mongoose';

const searchSchema = new Schema({
    term: { type: String, required: true },
    results: { type: Object, required: false },
    timestamp: { type: Date, default: Date.now },
    sessionId: String
});

export default searchSchema;