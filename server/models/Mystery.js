import mongoose from 'mongoose';

const mysterySchema = new mongoose.Schema({
  title: String, scenario: String, briefing: String,
  suspects: [{ id: String, name: String, role: String, age: Number, motive: String, description: String, alibi: String }],
  evidence: [{ id: String, type: String, icon: String, title: String, location: String, content: String }],
  culpritId: { type: String, required: true, select: false },
  solution: { type: String, required: true, select: false },
  hint: String,
}, { timestamps: true });

export default mongoose.model('Mystery', mysterySchema);
