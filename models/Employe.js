const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: 60,
      
      trim: true,
    },
   
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    
    },
   

      price: {
        type: Number,
        trime: true,
        require: true,
        maxlength: 32,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employe", employeSchema);
