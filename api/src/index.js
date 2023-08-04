import express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import routes from "../src/routes";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('images'))

routes(app)

app.listen(3001)

console.log("Api Start")