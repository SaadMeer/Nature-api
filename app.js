const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;


























// const express = require('express');
// const morgan = require('morgan');

// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');

// const app = express();
// //middleware isa function that can modify the incoming request data

// // 1) MIDDLEWARES
// app.use(morgan('dev'));
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello for the middleware');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// //get request
// // app.get('/api/v1/tours', getAllTours);
// // app.get('/api/v1/tours/:id', getTour);
// //post request to post data
// // app.post(`/api/v1/tours`, createTour);
// //patch request to update data
// // app.patch('/api/v1/tours/:id', updateTour);
// //Delete method
// // app.delete('/api/v1/tours/:id', deleteTour);

// //RouteMiddle and Mounting
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

// //4) Start Server
// const port = 3000;
// app.listen(port, '127.0.0.1', () => {
//   console.log(`App running on port ${port}`);
// });
