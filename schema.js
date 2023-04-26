const mongoose=require('mongoose');
const Schema = new mongoose.Schema(
    {
      value: {
        type: String,
        required: true,
      }
    })
    
    const Model = mongoose.model("about", Schema);
    module.exports = Model;