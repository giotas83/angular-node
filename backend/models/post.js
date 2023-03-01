const mongoose = require('mongoose');

// come il modello Post nel FE
const PostSchema = mongoose.Schema({ // id lo mette mongoose
  title: {type: String, required: true}, // in typescript: string, in javascript:tring
  content: {type: String, required: true}
});

module.exports = mongoose.model('Post', PostSchema);
