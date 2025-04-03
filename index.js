const moment = require('moment-timezone');
require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

app.get('/', (req, res) => {
    res.send('Hello from SymbioSphere Backend!');
});

app.get('/testdb', async (req, res) => {
    try {
        const result = await client.query('SELECT NOW()');
        const postgresTime = moment(result.rows[0].now).tz('Asia/Kolkata');
        res.send(postgresTime.format());
    } catch (error) {
        res.send(error);
    }
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});


// ... (Your existing code: require statements, env setup, express init, db connection, middleware)

// Protected environmental data routes:
// Protected environmental data routes:
app.post('/environmental-data', authenticateToken, async (req, res) => {
  try {
      const { location_id, temperature, humidity, air_quality } = req.body;
      const userId = req.user.userId;
      const newData = await client.query(
          'INSERT INTO environmental_data (user_id, location_id, temperature, humidity, air_quality) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [userId, location_id, temperature, humidity, air_quality]
      );
      res.json(newData.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

app.get('/environmental-data', authenticateToken, async (req, res) => {
  try {
      const allData = await client.query('SELECT * FROM environmental_data');
      res.json(allData.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

app.get('/environmental-data/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const data = await client.query('SELECT * FROM environmental_data WHERE data_id = $1', [id]);
      if (data.rows.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
      }
      res.json(data.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

app.get('/environmental-data/location/:locationId', authenticateToken, async (req, res) => {
try {
  const { locationId } = req.params;
  const data = await client.query('SELECT * FROM environmental_data WHERE location_id = $1', [locationId]);
  res.json(data.rows);
} catch (err) {
  console.error(err.message);
  res.status(500).json({ error: err.message });
}
});

app.put('/environmental-data/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const { location_id, temperature, humidity, air_quality } = req.body;
      const updatedData = await client.query(
          'UPDATE environmental_data SET location_id = $1, temperature = $2, humidity = $3, air_quality = $4 WHERE data_id = $5 RETURNING *',
          [location_id, temperature, humidity, air_quality, id]
      );
      if (updatedData.rows.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
      }
      res.json(updatedData.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

app.delete('/environmental-data/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const deletedData = await client.query('DELETE FROM environmental_data WHERE data_id = $1 RETURNING *', [id]);
      if (deletedData.rows.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ message: 'Data deleted', data: deletedData.rows[0] });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

// ... (Your existing code: app.listen, bcrypt, jwt, express.json, register, login, authenticateToken, location routes)
// Protected locations routes:
app.post('/locations', authenticateToken, async (req, res) => {
  try {
      const { location_name, latitude, longitude } = req.body;
      const userId = req.user.userId; // Get user ID from JWT
      const newLocation = await client.query(
          'INSERT INTO locations (user_id, location_name, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
          [userId, location_name, latitude, longitude]
      );
      res.json(newLocation.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});

app.get('/locations', authenticateToken, async (req, res) => {
    try {
        const allLocations = await client.query('SELECT * FROM locations');
        res.json(allLocations.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/locations/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const location = await client.query('SELECT * FROM locations WHERE location_id = $1', [id]);
        if (location.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.put('/locations/:id', authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const { location_name, latitude, longitude } = req.body;
      const updatedLocation = await client.query(
          'UPDATE locations SET location_name = $1, latitude = $2, longitude = $3 WHERE location_id = $4 RETURNING *',
          [location_name, latitude, longitude, id]
      );
      if (updatedLocation.rows.length === 0) {
          return res.status(404).json({ error: 'Location not found' });
      }
      res.json(updatedLocation.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
  }
});


app.delete('/locations/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLocation = await client.query('DELETE FROM locations WHERE location_id = $1 RETURNING *', [id]);
        if (deletedLocation.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location deleted', location: deletedLocation.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});