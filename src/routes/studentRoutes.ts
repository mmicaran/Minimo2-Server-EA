import { Request, Response, Router } from 'express';
import Student from '../models/student';


class StudentRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getStudents(req: Request, res: Response) {
        await Student.find({}).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async getStudent(req: Request, res: Response){
        await Student.findOne({ "_id": req.params.id }).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async addStudent(req: Request, res: Response){

        const { name, address, phones, studies } = req.body;
        console.log(phones);
        const newStudent = new Student({ name, address, phones, studies});

        await newStudent.save().then((data) => {
            res.status(201).json(data);
            console.log(data);

        }).catch((err) => {
            res.status(500).json(err);
        });


    }

    async getTelecos(req: Request, res: Response) {
        await Student.find({ "studies": {$all : ["telecos"]} }).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async getTelematica(req: Request, res: Response){
        await Student.find({ "studies": {$all : ["telematica"]} }).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    async getAeros(req: Request, res: Response) {
        await Student.find({ "studies": {$all : ["aeros"]} }).then((data) => {
            res.status(200).json(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }




    async deleteStudent(req: Request, res: Response) {
        const _id = req.params.id;
        const student = new Student();
        console.log(req.params.id);

        await Student.findByIdAndDelete(_id).then((data) => {
            res.status(201).json(data);
            console.log(data);

        }).catch((err) => {
            res.status(500).json(err);
        });

    }

    routes() {
        this.router.get('/student', this.getStudents);
        this.router.post('/student', this.addStudent);
        this.router.delete('/student/:id', this.deleteStudent);
        this.router.get('/student/:id', this.getStudent);
        this.router.get('/telecos', this.getTelecos);
        this.router.get('/telematica', this.getTelematica);
        this.router.get('/aeros', this.getAeros);
    }
}

const studentRoutes = new StudentRoutes();
studentRoutes.routes();

export default studentRoutes.router;