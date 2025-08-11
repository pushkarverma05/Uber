const dotenv = require('dotenv');
dotenv.config();
const express =require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const bodyParser = require("body-parser");
const admin = require("../Backend/utils/Firebase");
// Connect to the database
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("hello");
});
app.post("/verify-otp", async (req, res) => {
  try {
    const { idToken } = req.body; // from Firebase client SDK after OTP
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // You can now create or update user in DB
    const uid = decodedToken.uid;
    const phoneNumber = decodedToken.phone_number;

    // Example: send back success response
    res.status(200).json({ message: "OTP Verified Successfully", uid, phoneNumber });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;