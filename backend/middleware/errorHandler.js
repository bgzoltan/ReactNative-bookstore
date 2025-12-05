export default (err, req, res, next) => {
  function mapJoiErrorsToFormik(joiError) {
    if (!joiError || !joiError.details) return {};
    // Reduce Joi details array into an object keyed by field name
    const formikErrors = joiError.details.reduce((acc, error) => {
      const fieldName = error.path[0];
      if (!acc[fieldName]) {
        acc[fieldName] = error.message;
      }
      return acc;
    }, {});

    return formikErrors;
  }

  //  * error object structure to handle errors consistently
  //   {
  //   "message": "",
  //   "errors": {
  //     "email": "Invalid data",
  //     "password": "Invalid data"
  //   }
  // }

  // JOI error
  if (err.isJoi) {
    return res.status(400).json({
      message: "Validation failed",
      errors: mapJoiErrorsToFormik(err),
    });
  }

  // Mongo , Axios and custom errors
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors || {},
    });
  }

  // Unexpected error
  res.status(500).json({
    message: "Internal server error",
    errors: {},
  });
};
