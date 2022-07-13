{% set resource = data["resource"] -%}
{% set rescap = data["resource"].capitalize() -%}
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {{resource}}Validation = require('../../validations/{{resource}}.validation');
const {{resource}}Controller = require('../../controllers/{{resource}}.controller');

const router = express.Router();
router.get('/', validate({{resource}}Validation.get{{rescap}}s), {{resource}}Controller.get{{rescap}}s);

router
  .route("/")
  .post(auth('adminRole'), validate({{resource}}Validation.create{{rescap}}), {{resource}}Controller.create{{rescap}});

router
  .route("/:{{resource}}Id")
  .get(auth('adminRole'), validate({{resource}}Validation.get{{rescap}}), {{resource}}Controller.get{{rescap}})
  .delete(auth("adminRole"), validate({{resource}}Validation.delete{{rescap}}), {{resource}}Controller.delete{{rescap}});


module.exports = router;
