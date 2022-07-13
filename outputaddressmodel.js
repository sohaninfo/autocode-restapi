const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const testtypeSchema = mongoose.Schema(
    {
name: {
            type: String,
            required: true,
            trim: true,
        },
     street
name: {
            type: String,
            required: true,
            trim: true,
        },
     city
name: {
            type: String,
            required: true,
            trim: true,
        },
     state
name: {
            type: String,
            required: true,
            trim: true,
        },
     country
name: {
            type: String,
            required: true,
            trim: true,
        },
     pin


        name: {
            type: String,
            required: true,
            trim: true,
        },
        desc: {
            type: String,
            required: false,
            trim: true,
        },
        value: {
            type: Number,
            required: false,
        },
    }
);


testtypeSchema.plugin(toJSON);
testtypeSchema.plugin(paginate);


const testtypeModule = mongoose.model('testtype', testtypeSchema);

module.exports = testtypeModule;