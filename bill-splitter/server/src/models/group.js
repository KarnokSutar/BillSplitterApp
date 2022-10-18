const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]}, { timestamps: true });

    const Group = mongoose.model('Group', GroupSchema);

    module.exports = Group;

    