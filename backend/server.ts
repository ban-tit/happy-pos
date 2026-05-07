import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './db/db';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/menus', async (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Please provide name and price' });
  }

  try {
    const text = 'INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *';
    const values = [name, price];
    const result = await db.query(text, values);
    res.status(201).json({ menus: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

  // const text = 'INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *';
  // const values = [name, price];
  // const result = await db.query(text, values);
  // res.send({ menus: result.rows[0] });
});

app.delete('/menus/:menuId', async (req: Request, res: Response) => {
  console.log('inside menus delete');

  const { menuId } = req.params;
  if (!menuId) return res.status(400).json({ error: 'Please provide menuId' });

  const text = 'DELETE FROM menus WHERE id = $1 RETURNING *';
  const values = [menuId];
  const result = await db.query(text, values);
  res.send({ menus: result.rows[0] });
});

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello World!' });
});

app.get('/data', async (req: Request, res: Response) => {
  const menus = await db.query('SELECT * FROM menus');
  const menuCategories = await db.query('SELECT * FROM menu_categories');
  const addons = await db.query('SELECT * FROM addons');
  const addonCategories = await db.query('SELECT * FROM addon_categories');
  const menuLocations = await db.query('SELECT * FROM menus_locations');
  const locations = await db.query('SELECT * FROM locations');

  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    menuLocations: menuLocations.rows,
    locations: locations.rows,
  });
});

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isValid =
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) {return res.send({ error: 'Please provide email and password' })};

  const result = await db.query('select * from users where email=$1 and password=$2',[email, password])
  if(!result.rows.length) return res.send({error:'Bad request. Invalid credentials.'})

  res.send(result.rows)
});

app.post('/auth/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid) {return res.send({ error: 'Please provide name, email and password' })};

  const result = await db.query('select * from users where email=$1 ',[email])
  if(result.rows.length) return res.send({error:'Bad request. User already exists.'})

  const newUser = await db.query('insert into users (name, email, password) values ($1, $2, $3) returning *', [name, email, password])

  res.send(newUser)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
