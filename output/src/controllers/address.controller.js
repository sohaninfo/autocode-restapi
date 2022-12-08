const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');

const createAddress = catchAsync(async (req, res) => {
  const result = await addressService.createAddress(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getAddresss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['Address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await addressService.getAddresss(filter, options);
  res.send(result);
});


const getAddress = catchAsync(async (req, res) => {
  const result = await addressService.getAddressById(req.params.AddressId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  res.send(result);
});

const deleteAddress = catchAsync(async (req, res) => {
  console.log("Delete Address by id:", req.params.AddressId);
  await addressService.deleteAddress(req.params.AddressId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAddress,
  getAddresss,
  deleteAddress,
  getAddress
}