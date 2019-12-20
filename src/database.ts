import mongoose from "mongoose";

const URI = "mongodb://localhost/minim2";

mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
