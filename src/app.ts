import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`watchin in the http://localhost:${PORT}`));

app.get("/", async (_req: Request, res: Response) => {
  const password = await createHashPassword(12);

  res.redirect("/auth?password=" + password);

  //   res.send(password);
});

app.get("/auth", async (req: Request, res: Response) => {
  const password: string = req.query.password as string;

  const isAuthenticate = await bcrypt.compare("contraseña", password);

  res.send(isAuthenticate);
});

async function createHashPassword(saltRounds: number) {
  return await bcrypt.hash("contraseña", saltRounds);
}
