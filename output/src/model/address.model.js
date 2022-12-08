const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const addressSchema = mongoose.Schema(
    {
        name: {
                type: string,
                required: false
        },
        street: {
                type: string,
                required: false
        },
        city: {
                type: string,
                required: false
        },
        state: {
                type: string,
                required: false
        },
        country: {
                type: string,
                required: false
        },
        pin: {
                type: string,
                required: false
        },
        
    }
);

addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);
const mongoModule = mongoose.model(address, addressSchema);
module.exports = mongoModule;