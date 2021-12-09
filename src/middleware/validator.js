export const validateInformation = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
};

export const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      console.log(req.params)
      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
};
