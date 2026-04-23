import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './db/db';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/menus', async (req: Request, res: Response) => {
  const { name, price } = req.body;
  if (!name || !price) return res.send('please provide name and price');

  const text = 'INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *';
  const values = [name, price];
  const result = await db.query(text, values);
  res.send({ menus: result.rows[0] });
});

app.delete('/menus/:menuId', async (req: Request, res: Response) => {
  console.log('inside menus delete');

  const { menuId } = req.params;
  if (!menuId) return res.send('please provide menuId');

  const text = 'DELETE FROM menus WHERE id = $1 RETURNING *';
  const values = [menuId];
  const result = await db.query(text, values);
  res.send({ menus: result.rows[0] });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/data', async (req: Request, res: Response) => {
  const menus = await db.query('SELECT * FROM menus');
  const menuCategories = await db.query('SELECT * FROM menu_categories');
  const addons = await db.query('SELECT * FROM addons');
  const addonCategories = await db.query('SELECT * FROM addon_categories');
  const menuLocations = await db.query('SELECT * FROM menus_locations');
  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    menuLocations: menuLocations.rows,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
