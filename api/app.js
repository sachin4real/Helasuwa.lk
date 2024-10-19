// app.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/uploads', express.static('uploads')); // Prescription upload in insurance claim

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Routes
const patientRouter = require("./routes/route.patient.js");
app.use("/patient", patientRouter);

const admintRouter = require("./routes/admins");
app.use("/admin", admintRouter);

const doctorRoutes = require("./routes/route.doctors.js");
app.use("/doctor", doctorRoutes);

const channelRouter = require("./routes/route.channels.js");
app.use("/channel", channelRouter);

const appointmentRouter = require("./routes/route.appointment.js");
app.use("/appointment", appointmentRouter);

const prescriptionRouter = require("./routes/route.prescription.js");
app.use("/prescription", prescriptionRouter);

const reportRouter = require("./routes/reports");
app.use("/report", reportRouter);

const testRoutes = require("./routes/testRoutes");
app.use("/test", testRoutes);

const recordtRouter = require("./routes/records");
app.use("/record", recordtRouter);

const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/Inventory", inventoryRoutes);

const orderRoutes = require("./routes/order.js");
app.use("/Order", orderRoutes);

const pharmcyRoutes = require("./routes/pharmacyin");
app.use("/PharmacyIn", pharmcyRoutes);

const cardRoutes = require('./routes/CardRoutes.js');
app.use("/card", cardRoutes);

const insuranceRoutes = require('./routes/insuranceRoutes');
app.use("/insurance", insuranceRoutes);

// Export the app
module.exports = app;
