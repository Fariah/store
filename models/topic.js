var mongoose    = require(".././lib/mongoose");

var Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Topic = mongoose.model('Topic', schema);