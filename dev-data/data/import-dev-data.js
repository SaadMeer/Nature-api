//write script to add data from json file to database
const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './../../../config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// console.log(process.env);
// .connect(process.env.DATABASE_LOCAL, { this is for local data base
mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB conection successfull'));



//Read Data from from file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.js`, 'uft-8'));

//import data form file
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log("Data Imported SuccessFully");
    }catch(err) {
        console.log(err)
    }
}

//delete data from file if data is exist
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log();
    }catch(err) {
        console.log(err);
    }
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}
