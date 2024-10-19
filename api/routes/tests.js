const router = require("express").Router();
let Test = require("../models/Test");

router.route("/add").post((req, res) => {
  const patient = req.body.pid;
  const name = req.body.name;
  const age = req.body.age;
  const type = req.body.type;

  const newTest = new Test({
    patient,
    name,
    age,
    type,
  });

  newTest
    .save()
    .then(() => {
      res.json("Prescription Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Test.find()
    .then((tests) => {
      res.json(tests);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:id").get(async (req, res) => {
  let tid = req.params.id;

  const tst = await Test.findById(tid)
    .then((test) => {
      res.status(200).send({ status: "Test fetched", test: test });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting Test details",
        error: err.message,
      });
    });
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.query; // Assuming you send the search query as a query parameter
    const results = await Test.find({
      $or: [
        { type: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  let tid = req.params.id;

  await Test.findByIdAndDelete(tid)
    .then(() => {
      res.status(200).send({ status: "Test deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(202)
        .send({ status: "Error with deleting the Test", error: err.message });
    });
});

app.get('/test/patient/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const tests = await Test.find({ patient: patientId }); // Adjust according to your schema
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests' });
  }
});


module.exports = router;
