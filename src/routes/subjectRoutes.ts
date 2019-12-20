import { Request, Response, Router } from 'express';
import Subject from '../models/subject';
import Student from '../models/student';


class SubjectRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getSubjects(req: Request, res: Response) {

        try {
            const subjects = await Subject.find({});
            if (!subjects) {
                res.status(404).send({ message: 'Subjects not found' });

            } else {
                res.status(201).json(subjects);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }


    }

    async getSubject(req: Request, res: Response) {

        try {
            const subject = await Subject.findOne({ "_id": req.params.id });
            if (!subject) {
                res.status(404).send({ message: 'Subject not found' });

            } else {
                res.status(201).json(subject);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }


    }

    async createSubject(req: Request, res: Response) {

        const subject = new Subject({ name: req.body.name });

        try {
            const newSubject = await subject.save();
            if (!newSubject) {
                res.status(404).send({ message: 'Subject not created' });

            } else {
                res.status(201).json(subject);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteSubject(req: Request, res: Response) {

        const subjectId = req.params.id;

        try {
            const deleteSubject = await Subject.findByIdAndDelete(subjectId);
            if (!deleteSubject) {
                res.status(404).send({ message: 'Subject not deleted' });

            } else {
                res.status(201).json({ message: 'Subject deleted' });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async addStudentSubject(req: Request, res: Response) {
        const studentId = req.body.studentId;
        const subjectId = req.body.subjectId;

        console.log(`SubjectID: ${subjectId}, StudentId: ${studentId}`);

        try {
            let studentOk = await Student.findById(studentId);
            console.log(studentOk);

            if (!studentOk) {
                return res.status(404).send({ message: 'Student not found' });
            } else {

                let subjectUpdate = await Subject.findOneAndUpdate({ _id: subjectId }, { $addToSet: { students: studentId } });
                if (!subjectUpdate) {

                    return res.status(404).send({ message: 'Subject not found' });
                } else {
                    console.log(subjectUpdate);
                    return res.status(201).send({ message: 'Student added' });
                }
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteStudentSubject(req: Request, res: Response) {
        const studentId = req.body.studentId;
        const subjectId = req.body.subjectId;

        console.log(`SubjectID: ${subjectId}, StudentId: ${studentId}`);

        try {
            let studentOk = await Student.findById(studentId);
            console.log(studentOk);

            if (!studentOk) {
                return res.status(404).send({ message: 'Student not found' });
            } else {

                let subjectUpdate = await Subject.findOneAndUpdate({ _id: subjectId }, { $pull: { students: studentId } });
                if (!subjectUpdate) {

                    return res.status(404).send({ message: 'Subject not found' });
                } else {
                    console.log(subjectUpdate);
                    return res.status(201).send({ message: 'Student deleted from Subject' });
                }
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateSubject(req: Request, res: Response) {
        const subject = { name: req.body.name };

        try {
            let subjectUpdate = await Subject.findByIdAndUpdate(req.params.id, { $set: subject }, { new: true });

            if (!subjectUpdate) {
                return res.status(404).send({ message: 'Subject not found' });
            } else {
                return res.status(201).send({ message: 'Subject updated' });
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getSubjectDetails(req: Request, res: Response) {

        try {
            const subject = await Subject.findOne({ "_id": req.params.id }).populate('students');
            if (!subject) {
                res.status(404).send({ message: 'Subject not found' });

            } else {
                res.status(201).json(subject);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }


    }



    routes() {
        this.router.get('/subject', this.getSubjects);
        this.router.get('/subject/:id', this.getSubject);
        this.router.get('/subject/:id/details', this.getSubjectDetails);
        this.router.post('/subject', this.createSubject);
        this.router.post('/subject/addstudent', this.addStudentSubject);
        this.router.post('/subject/deletestudent', this.deleteStudentSubject);
        this.router.delete('/subject/:id', this.deleteSubject);
        this.router.put('/subject/:id', this.updateSubject);


    }
}

const subjectRoutes = new SubjectRoutes();
subjectRoutes.routes();

export default subjectRoutes.router;