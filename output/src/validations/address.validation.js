const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAddress = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    desc: Joi.string().allow(null, ''),
    value: Joi.number().allow(null, 0),
  }).unknown(true)
};

const getAddresss = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};



const getAddress = {
  params: Joi.object().keys({
    testtypeId: Joi.string().custom(objectId),
  }),
};

const deleteAddress = {
  params: Joi.object().keys({
    testtypeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAddress,
  getAddresss,
  deleteAddress,
  getAddress
}