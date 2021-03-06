const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const pumpRouter = require('./routes/pump');
const pumpersRouter = require('./routes/pumpers');
const pricesRouter = require('./routes/prices')
const salesRouter = require('./routes/sales');
const pumperrecordsRouter = require('./routes/pumpers_records');
const userRouter = require('./routes/user')


app.use('/pump', pumpRouter);
app.use('/pumpers', pumpersRouter);
app.use('/prices', pricesRouter );
app.use('/sales', salesRouter);
app.use('/pumperrecords', pumperrecordsRouter);
app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});