import express, { Application, json } from "express";
import morgan from "morgan";

// routes
import PostsRoutes from "./routes/posts.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(json());
  }

  routes() {
    this.app.use("/posts", PostsRoutes);
  }

  async listen() {
    this.app.listen(this.app.get("port"));
    console.log("server on port:", this.app.get("port"));
  }
}
