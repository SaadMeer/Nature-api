/* eslint-disable prettier/prettier */
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
<<<<<<< HEAD
const app = require('./app');

=======
>>>>>>> refs/remotes/origin/main
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// console.log(process.env);
// .connect(process.env.DATABASE_LOCAL, { this is for local data base
mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB conection successfull'));

//for testing model
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997
// })

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('ERROE BOOM', err);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
