// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;
// //
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');

// // const app = express();
// // const PORT = 3000;

// // app.use(cors());
// // app.use(bodyParser.json());

// // mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // const NameSchema = new mongoose.Schema({
// //   name: String,
// // });

// // const NameModel = mongoose.model('Name', NameSchema);

// // app.get('/checkName/:name', async (req, res) => {
// //   try {
// //     const { name } = req.params;
// //     const existingName = await NameModel.findOne({ name });

// //     if (existingName) {
// //       res.json({ exists: true, message: 'Name exists in the database.' });
// //     } else {
// //       res.json({ exists: false, message: 'Name does not exist in the database.' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ exists: false, message: 'Internal Server Error' });
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}`);
// // });
// //
// mongoose.connect('mongodb+srv://raghdamousa28:<1234567890@r>@cluster0.ojct2uq.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const Fruit = mongoose.model('Fruit', { name: String });

// app.get('/api/fruits', async (req, res) => {
//   try {
//     const searchValue = req.query.search;
//     const fruits = await Fruit.find({ name: { $regex: new RegExp(searchValue, 'i') } });
//     res.json(fruits);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// // Create a MongoDB Account schema
// const accountSchema = new mongoose.Schema({
//   name: String,
//   email: Email,
//   phone: Number,

//   // Add other fields as needed
// });
// const baccountSchema = new mongoose.Schema({
//     name: String,
//     phone: Number,
  
//     // Add other fields as needed
//   });
// const bookingSchema = new mongoose.Schema({
//     parkname: String,
//     price: Number,
    
//     // Add other fields as needed
//   });
// const Booking= new mongoose.model('Booking',bookingSchema);
// const Account = mongoose.model('Account', accountSchema);
// const bAccount = mongoose.model('bAccount', baccountSchema);

// app.use(cors());

// // API endpoint to fetch account data
// app.get('/api/accounts', async (req, res) => {
//   try {
//     const accounts = await Account.find();
//     res.json(accounts);
//   } catch (error) {
//     console.error('Error fetching account data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// // API endpoint to fetch baccount data
// app.get('/api/baccounts', async (req, res) => {
//     try {
//       const baccounts = await bAccount.find();
//       res.json(baccounts);
//     } catch (error) {
//       console.error('Error fetching account data:', error);
//       res.status(500).send('Internal Server Error');
//     }
// });

// // API endpoint to fetch booking data

// app.get('/api/booking', async (req, res) => {
//     try {
//       const booking = await Booking.find();
//       res.json(booking);
//     } catch (error) {
//       console.error('Error fetching booking data:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

// app.listen(PORT, () => {
//   // console.log('Server is running on port ${PORT}');
// });
