import { Hono } from "hono";
import { bibleRouter } from "../routes/bible";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

app.route("/api", bibleRouter);

export default app;
