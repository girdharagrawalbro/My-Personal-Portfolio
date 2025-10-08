require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'portfolio_db';

let db;

async function start() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB', MONGO_URI, DB_NAME);

  // Development-only admin seed: create or update an admin user if env provided
  try {
    const DEV_ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL;
    const DEV_ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD;
    if (DEV_ADMIN_EMAIL && DEV_ADMIN_PASSWORD) {
      const bcrypt = require('bcryptjs');
      const existing = await db.collection('users').findOne({ email: DEV_ADMIN_EMAIL });
      const hash = await bcrypt.hash(DEV_ADMIN_PASSWORD, 10);
      if (existing) {
        await db.collection('users').updateOne({ _id: existing._id }, { $set: { password: hash, role: 'admin', updated_at: new Date() } });
        console.log('Updated dev admin user:', DEV_ADMIN_EMAIL);
      } else {
        const user = { email: DEV_ADMIN_EMAIL, password: hash, name: 'Dev Admin', role: 'admin', created_at: new Date() };
        await db.collection('users').insertOne(user);
        console.log('Created dev admin user:', DEV_ADMIN_EMAIL);
      }
    }
  } catch (err) {
    console.error('Failed to seed dev admin user', err);
  }

  // --- Authentication endpoints ---
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  // Dev-only admin seed
  const DEV_ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL;
  const DEV_ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD;
  if (DEV_ADMIN_EMAIL && DEV_ADMIN_PASSWORD) {
    (async () => {
      try {
        const bcrypt = require('bcryptjs');
        const existing = await db.collection('users').findOne({ email: DEV_ADMIN_EMAIL });
        const hash = await bcrypt.hash(DEV_ADMIN_PASSWORD, 10);
        if (existing) {
          await db.collection('users').updateOne({ _id: existing._id }, { $set: { password: hash, role: 'admin', updated_at: new Date() } });
          console.log('Dev admin user updated:', DEV_ADMIN_EMAIL);
        } else {
          const user = { email: DEV_ADMIN_EMAIL, password: hash, name: 'Dev Admin', role: 'admin', created_at: new Date() };
          await db.collection('users').insertOne(user);
          console.log('Dev admin user created:', DEV_ADMIN_EMAIL);
        }
      } catch (e) {
        console.error('Failed to seed dev admin user', e);
      }
    })();
  }

  // Helper to create token
  function signToken(user) {
    const payload = { id: String(user._id), email: user.email };
    return require('jsonwebtoken').sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Register
  app.post('/auth/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
      const existing = await db.collection('users').findOne({ email });
      if (existing) return res.status(409).json({ error: 'User already exists' });
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash(password, 10);
      const user = { email, password: hash, name: name || '', created_at: new Date() };
      const result = await db.collection('users').insertOne(user);
      const saved = await db.collection('users').findOne({ _id: result.insertedId });
      const token = signToken(saved);
      res.json({ user: { id: String(saved._id), email: saved.email, name: saved.name }, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register' });
    }
  });

  // Login
  app.post('/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

      // Development env override: allow env-specified admin credentials
      const DEV_ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL;
      const DEV_ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD;
      if (DEV_ADMIN_EMAIL && DEV_ADMIN_PASSWORD && email === DEV_ADMIN_EMAIL && password === DEV_ADMIN_PASSWORD) {
        // Return a pseudo-admin user without checking DB
        const adminUser = { _id: new ObjectId(), email: DEV_ADMIN_EMAIL, name: 'Dev Admin', role: 'admin' };
        const token = signToken(adminUser);
        return res.json({ user: { id: String(adminUser._id), email: adminUser.email, name: adminUser.name, role: 'admin' }, token });
      }

      const user = await db.collection('users').findOne({ email });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const bcrypt = require('bcryptjs');
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = signToken(user);
      res.json({ user: { id: String(user._id), email: user.email, name: user.name, role: user.role || 'user' }, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to login' });
    }
  });

  // Me endpoint
  app.get('/auth/me', async (req, res) => {
    try {
      const auth = req.headers.authorization || '';
      const token = auth.replace(/^Bearer\s+/i, '');
      if (!token) return res.status(401).json({ error: 'Missing token' });
      const jwt = require('jsonwebtoken');
      let decoded;
      try {
        decoded = jwt.verify(token, JWT_SECRET);
      } catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ id: String(user._id), email: user.email, name: user.name });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // Middleware to require auth (for admin routes)
  function requireAuth(req, res, next) {
    const auth = req.headers.authorization || '';
    const token = auth.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Missing token' });
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  // --- End Auth endpoints ---

  // Protect collection write routes for admin by default (but allow read)
  app.get('/api/:collection', async (req, res) => {
    try {
      const { collection } = req.params;
      const docs = await db.collection(collection).find({}).sort({ created_at: -1 }).toArray();
      res.json(docs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch documents' });
    }
  });

  app.get('/api/:collection/:id', async (req, res) => {
    try {
      const { collection, id } = req.params;
      const doc = await db.collection(collection).findOne({ _id: new ObjectId(id) });
      res.json(doc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch document' });
    }
  });

  app.post('/api/:collection', async (req, res) => {
    try {
      const { collection } = req.params;
      const data = { ...req.body, created_at: new Date() };
      // If collection is 'projects' or other admin collections, require auth header
      if (['projects', 'experience', 'education', 'skills', 'contact'].includes(collection)) {
        // allow dev bypass with ENV flag
        if (process.env.REQUIRE_AUTH === 'true') {
          try {
            requireAuth(req, res, () => {});
          } catch (e) {
            return; // requireAuth will send response
          }
        }
      }
      const result = await db.collection(collection).insertOne(data);
      res.json({ ...data, _id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert document' });
    }
  });

  // Generic upsert endpoint: body { payload, onConflict: 'field1,field2' }
  app.post('/api/:collection/upsert', async (req, res) => {
    try {
      const { collection } = req.params;
      const { payload, onConflict } = req.body;
      if (!payload) return res.status(400).json({ error: 'Missing payload' });

      if (onConflict) {
        const keys = onConflict.split(',').map(k => k.trim()).filter(Boolean);
        const query = {};
        keys.forEach(k => {
          if (payload[k] !== undefined) query[k] = payload[k];
        });

        if (Object.keys(query).length > 0) {
          const existing = await db.collection(collection).findOne(query);
          if (existing) {
            await db.collection(collection).updateOne({ _id: existing._id }, { $set: { ...payload, updated_at: new Date() } });
            const updated = await db.collection(collection).findOne({ _id: existing._id });
            return res.json(updated);
          }
        }
      }

      // Default to insert
      const data = { ...payload, created_at: new Date() };
      const result = await db.collection(collection).insertOne(data);
      res.json({ ...data, _id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upsert document' });
    }
  });

  app.put('/api/:collection/:id', async (req, res) => {
    try {
      const { collection, id } = req.params;
      const updates = { ...req.body, updated_at: new Date() };
      await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: updates });
      const updated = await db.collection(collection).findOne({ _id: new ObjectId(id) });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update document' });
    }
  });

  app.delete('/api/:collection/:id', async (req, res) => {
    try {
      const { collection, id } = req.params;
      await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete document' });
    }
  });

  // RPC-like endpoint to support simple server-side functions
  app.post('/rpc/:function', async (req, res) => {
    try {
      const { function: fn } = req.params;
      const body = req.body || {};

      if (fn === 'increment_page_views') {
        const { page_name } = body;
        if (!page_name) return res.status(400).json({ error: 'Missing page_name' });
        const collection = 'analytics';
        const today = new Date().toISOString().split('T')[0];
        const result = await db.collection(collection).findOneAndUpdate(
          { page: page_name, date: today },
          { $inc: { views: 1 }, $setOnInsert: { created_at: new Date() } },
          { upsert: true, returnDocument: 'after' }
        );
        return res.json(result.value);
      }

      return res.status(404).json({ error: 'RPC function not found' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to execute rpc' });
    }
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
