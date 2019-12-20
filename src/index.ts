import express from "express";
import cors from "cors";

//import ROUTES
import studentRoutes from "./routes/studentRoutes";
import subjectRoutes from "./routes/subjectRoutes";

//inicialicacion
const app = express();
import './database';

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: '*'}));

//Routes
app.use('/', studentRoutes);
app.use('/', subjectRoutes);

//Static files

//starting the serve
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});