const fs = require('fs');
const express = require('express');
const { json } = require('express');

const app = express();

//middleware isa function that can modify the incoming request data
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server!', app: 'Natours  '})
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint..');
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//get request
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);
  //ttrick to change sting to number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'success',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
});

//post request to post data
app.post(`/api/v1/tours`, (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  //to create a new object and merge it
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

//patch request to update data
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: '<Updated tour here...>',
  });
});

// //Delete method
// app.delete('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   res.status(204).json({
//     status: 'success',
//     data: '<Updated tour here...>',
//   });
// });

const port = 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
