const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8070;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use('/uploads', express.static('uploads'));//prescription upload in insurance claim

const patientRouter = require("./routes/patients");
app.use("/patient", patientRouter);

const admintRouter = require("./routes/admins");
app.use("/admin", admintRouter);

const doctorRoutes = require("./routes/doctorRoutes.js");
app.use("/doctor", doctorRoutes);

const channelRouter = require("./routes/channels");
app.use("/channel", channelRouter);

const appointmentRouter = require("./routes/appointments");
app.use("/appointment", appointmentRouter);


const prescriptionRouter = require("./routes/prescriptions");
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
app.use("/card", cardRoutes)

const insuranceRoutes = require('./routes/insuranceRoutes');
app.use("/insurance", insuranceRoutes);


app.listen(process.env.PORT || port, () =>
  console.log(`Hospital app listening on port ${process.env.PORT}!`)
);
