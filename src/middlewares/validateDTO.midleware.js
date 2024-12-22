export const validateDTO = (schema) => {
  return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
          const errorDetails = error.details.map(detail => ({
              field: detail.context.key,
              message: detail.message
          }));
          return res.status(400).json({
              message: "Validation error",
              errors: errorDetails
          });
      }
      next();
  };
};
