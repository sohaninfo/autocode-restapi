const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');

const router = express.Router();
router.get('/', validate(addressValidation.getAddresss), addressController.getAddresss);

router
  .route("/")
  .post(auth('adminRole'), validate(addressValidation.createAddress), addressController.createAddress);

router
  .route("/:addressId")
  .get(auth('adminRole'), validate(addressValidation.getAddress), addressController.getAddress)
  .delete(auth("adminRole"), validate(addressValidation.deleteAddress), addressController.deleteAddress);


module.exports = router;