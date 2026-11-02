import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Mystery from './models/Mystery.js';
import { fallbackMystery } from './data/fallbackMystery.js';

const app = express();
const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
app.use(cors());
app.use(express.json({ limit: '20kb' }));

function validateMystery(value) {
  return value && typeof value.title === 'string' && typeof value.briefing === 'string'
    && Array.isArray(value.suspects) && value.suspects.length >= 3 && value.suspects.length <= 6
    && Array.isArray(value.evidence) && value.evidence.length >= 4
    && value.suspects.every(s => s.id && s.name && s.motive && s.alibi)
    && value.evidence.every(e => e.id && e.title && e.content)
    && value.suspects.some(s => s.id === value.culpritId)
    && typeof value.solution === 'string';
}

async function generateMystery(scenario) {
  if (!process.env.GEMINI_API_KEY) return { ...fallbackMystery, setting: scenario || fallbackMystery.setting };
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash', generationConfig: { responseMimeType: 'application/json', temperature: 0.8 } });
  const prompt = `Create a fair-play fictional mystery based on this prompt: ${scenario}. Return JSON only, with fields title, briefing, suspects (3-5 objects with id,name,role,age,motive,description,alibi), evidence (5-7 objects with id,type,icon,title,location,content), culpritId, solution, hint. IDs must be short strings. Exactly one culprit. Evidence must contain fair clues and consistent timelines. Never refer to real crimes or real people.`;
  const result = await model.generateContent(prompt);
  const value = JSON.parse(result.response.text());
  if (!validateMystery(value)) throw new Error('AI returned an incomplete mystery');
  return value;
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'memory', ai: Boolean(process.env.GEMINI_API_KEY) }));

app.post('/api/mysteries', async (req, res) => {
  const scenario = typeof req.body?.scenario === 'string' ? req.body.scenario.trim() : '';
  if (scenario.length > 1200) return res.status(400).json({ error: 'Keep your scenario under 1,200 characters.' });
  try {
    const value = await generateMystery(scenario);
    let id;
    if (mongoose.connection.readyState === 1) {
      const record = await Mystery.create({ ...value, scenario });
      id = record.id;
    } else {
      id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      memoryStore.set(id, { ...value, scenario });
    }
    const { culpritId, solution, ...publicCase } = value;
    res.status(201).json({ id, ...publicCase, scenario, mode: process.env.GEMINI_API_KEY ? 'ai' : 'sample' });
  } catch (error) {
    console.error('Mystery generation failed:', error.message);
    res.status(503).json({ error: 'The case could not be generated. Please try again.' });
  }
});

const memoryStore = new Map();
app.post('/api/mysteries/:id/answer', async (req, res) => {
  const selectedId = req.body?.suspectId;
  if (typeof selectedId !== 'string') return res.status(400).json({ error: 'Choose a suspect first.' });
  try {
    let mystery;
    if (req.params.id.startsWith('local-')) mystery = memoryStore.get(req.params.id);
    else if (mongoose.connection.readyState === 1) mystery = await Mystery.findById(req.params.id).select('+culpritId +solution');
    if (!mystery) return res.status(404).json({ error: 'Case not found. Start a new investigation.' });
    if (!mystery.suspects.some(s => s.id === selectedId)) return res.status(400).json({ error: 'That suspect is not part of this case.' });
    res.json({ correct: selectedId === mystery.culpritId, culpritId: mystery.culpritId, solution: mystery.solution });
  } catch { res.status(400).json({ error: 'Could not submit your answer.' }); }
});

app.use(express.static(path.join(projectRoot, 'dist')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(projectRoot, 'dist', 'index.html'), error => { if (error) next(); });
});

const port = Number(process.env.PORT) || 4000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).catch(error => console.error('MongoDB unavailable; using memory storage:', error.message));
}
app.listen(port, () => console.log(`Mystery Room API listening on http://localhost:${port}`));
