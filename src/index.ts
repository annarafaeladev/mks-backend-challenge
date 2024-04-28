import 'express-async-errors'
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { handleErrorsMiddleware } from "./middlewares/handleErrorsMiddleware";

AppDataSource.initialize().then(() => {
    const app  = express();
    app.use(express.json());
    
    app.use(routes);

    app.use(handleErrorsMiddleware);

    app.listen(process.env.PORT, () => {
        console.log("Server is running port: ", process.env.PORT);
    })

});

