const register = (req, res, next) => {
  try {
    // TODO handle register
    // const { email, password } = req.body;
    // console.log(email, password);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export { register };
