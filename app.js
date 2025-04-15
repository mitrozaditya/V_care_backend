const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// const routes = require('./routes/route');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// Routes
// app.use('/', routes);
app.get("/hello", (req, res) => {
  res.send("Hello from Node.js API!");
});
app.get("/test", (req, res) => {
  res.send("test from Node.js API!");
});

// admin routes
app.use('/api/admin', require('./routes/adminRoute/admin_Route'));


// User routes
app.use('/api/user', require('./routes/User/userRoute'))


// client routes
app.use('/api/client', require('./routes/Client/clientRoute'))

// supplier routes
app.use('/api/supplier', require('./routes/Supplier/supplierRoute'))


// product routes
app.use('/api/product', require('./routes/ProductRoute/productRoute'))

// category routes
app.use('/api/category', require('./routes/category/categoryRoutes'))

// inventory routes
app.use('/api/inventory', require('./routes/inventory/inventoryRoute'))




// enquiry routes
app.use('/api/enquiry', require('./routes/EnquiryRoute/enquiryRoute'));

// quotation routes
// app.use('/api/quotation', require('./routes/quotation/quotationRoute'))
app.use('/api/quotation', require('./routes/Quotation/quotationRoutes'))

// order routes
app.use('/api/order', require('./routes/Order/orderRoute'))

// challan routes
app.use('/api/challan', require('./routes/Challan/challanRoute'))

// invoice routes
app.use('/api/invoice', require('./routes/Invoice/invoiceRoute'))

// payment routes
app.use('/api/payment', require('./routes/Payment/paymentRoute'))


// Complaint routes
app.use('/api/complaint', require('./routes/Complaint/complaintRoute'))

// update Routes
app.use('/api/update', require('./routes/Updates/updateRoutes'))


// replace Product Routes
app.use('/api/replace', require('./routes/Replace/replaceRoute'))

// task management routes
app.use('/api/task', require('./routes/TaskManagement/taskRoute'))


// Policy routes
app.use('/api/policy', require('./routes/Policy/policyRoute'))




// Error handling middleware
app.use(errorHandler);

module.exports = app; 
