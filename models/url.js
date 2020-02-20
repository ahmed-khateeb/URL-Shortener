let mongoose = require('mongoose');
let urlSchema = mongoose.Schema({
    url: {type: String, required:true},
    slug:String,
    counter: {type: Number, default: 0},
    time: { type: Date, default: Date.now }
});
// NOTE: methods must be added to the schema before compiling it with mongoose.model()

let Url = mongoose.model('Url', urlSchema);
module.exports = Url;