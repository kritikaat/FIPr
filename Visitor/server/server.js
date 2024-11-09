const express = require("express");
const cors = require("cors");
const visitorRoutes = require("./routes/visitorsRoutes");
const busyDates = require("./routes/fetchdates");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/visitor", visitorRoutes);
app.use("/api/fetchdates", busyDates);

app.get("/", (req, res) => {
  res.send("Welcome to IPR Project Server");
}); // localhost:4000

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
