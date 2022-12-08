{% set resource = data["resource"] -%}
{% set rescap = data["resource"].capitalize() -%}
{% set mongoModel2 = "{ " + data["resource"].capitalize() + " }" -%}
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { {{resource}}Service } = require('../services');

const create{{rescap}} = catchAsync(async (req, res) => {
  const result = await {{resource}}Service.create{{rescap}}(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const get{{rescap}}s = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['{{rescap}}']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await {{resource}}Service.get{{rescap}}s(filter, options);
  res.send(result);
});


const get{{rescap}} = catchAsync(async (req, res) => {
  const result = await {{resource}}Service.get{{rescap}}ById(req.params.{{rescap}}Id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, '{{rescap}} not found');
  }
  res.send(result);
});

const delete{{rescap}} = catchAsync(async (req, res) => {
  console.log("Delete {{rescap}} by id:", req.params.{{resource}}Id);
  await {{resource}}Service.delete{{rescap}}(req.params.{{resource}}Id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create{{rescap}},
  get{{rescap}}s,
  delete{{rescap}},
  get{{rescap}}
}
