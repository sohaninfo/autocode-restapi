{% set resource = data["resource"] -%}
{% set rescap = data["resource"].capitalize() -%}
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create{{rescap}} = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    desc: Joi.string().allow(null, ''),
    value: Joi.number().allow(null, 0),
  }).unknown(true)
};

const get{{rescap}}s = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};



const get{{rescap}} = {
  params: Joi.object().keys({
    testtypeId: Joi.string().custom(objectId),
  }),
};

const delete{{rescap}} = {
  params: Joi.object().keys({
    testtypeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create{{rescap}},
  get{{rescap}}s,
  delete{{rescap}},
  get{{rescap}}
}
