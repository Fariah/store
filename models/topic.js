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

schema.statics.checkId = function(id, cb) {
    return this.findById(id, cb);
};

exports.Topic = mongoose.model('Topic', schema);