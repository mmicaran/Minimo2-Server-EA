import { Schema, model } from "mongoose";

const SubjectSchema = new Schema({
    name: {type: String, required: true, unique: true},
    students: [{type: Schema.Types.ObjectId, ref: 'Student', unique: false }]
    
});

export default model('Subject', SubjectSchema);