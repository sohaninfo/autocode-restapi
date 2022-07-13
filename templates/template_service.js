{% set resource = data["resource"] -%}
{% set mongoModel = data["resource"].capitalize() -%}
{% set mongoModel2 = "{ " + data["resource"].capitalize() + " }" -%}
const {{mongoModel2}} = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create {{resource}}
 * @param {Object} {{resource}}Body
 * @returns {Promise<{{mongoModel}}>}
 */

const create{{mongoModel}} = async({{resource}}Body) => {
    return {{mongoModel}}.create({{resource}}Body);
}


/**
 * Query for {{resource}}
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const get{{mongoModel}}s = async (filter, options) => {
    const result = await {{mongoModel}}.paginate(filter, options);
    return result;
  };


  /**
   * Get {{resource}} by id
   * @param {ObjectId} id
   * @returns {Promise<{{mongoModel}}>}
   */
  const get{{mongoModel}}ById = async (id) => {
    return {{mongoModel}}.findById(id);
  };


  /**
   * Delete {{resource}}  by id
   * @param {ObjectId} id
   * @returns {Promise<{{mongoModel}}>}
   */
  const delete{{mongoModel}} = async (id) => {
    const {{resource}} = await get{{mongoModel}}ById(id);
    if (!{{resource}}) {
      throw new ApiError(httpStatus.NOT_FOUND, '{{mongoModel}} not found');
    }
    await {{resource}}.remove();
    return {{resource}};
  };


module.exports = {
    create{{mongoModel}},
    get{{mongoModel}}ById,
    get{{mongoModel}}s,
    delete{{mongoModel}}
}