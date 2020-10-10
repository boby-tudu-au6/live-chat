const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/message",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));
