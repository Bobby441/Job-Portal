import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  image: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

const Company = mongoose.model('Company', companySchema)

export default Company