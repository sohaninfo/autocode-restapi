const { Address } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create address
 * @param {Object} addressBody
 * @returns {Promise<Address>}
 */

const createAddress = async(addressBody) => {
    return Address.create(addressBody);
}


/**
 * Query for address
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const getAddresss = async (filter, options) => {
    const result = await Address.paginate(filter, options);
    return result;
  };


  /**
   * Get address by id
   * @param {ObjectId} id
   * @returns {Promise<Address>}
   */
  const getAddressById = async (id) => {
    return Address.findById(id);
  };


  /**
   * Delete address  by id
   * @param {ObjectId} id
   * @returns {Promise<Address>}
   */
  const deleteAddress = async (id) => {
    const address = await getAddressById(id);
    if (!address) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
    }
    await address.remove();
    return address;
  };


module.exports = {
    createAddress,
    getAddressById,
    getAddresss,
    deleteAddress
}