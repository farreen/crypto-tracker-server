import Express  from "express";
import dbConnect from "./database/db.js";
import routes from "./src/route/accessRoute.js";
import cors from 'cors';
const port = 8000;
const app = Express();
app.use(Express.json());
app.use(cors());
app.use("/api", routes)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    dbConnect();
})