import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
    const app  = express();
    app.use(express.json());

    app.get("/", (req, res) => {
        return res.json("Hello Word");
    })

    app.listen(process.env.PORT, () => {
        console.log("Server is running port: ", process.env.PORT);
    })

    app.use(routes)
})