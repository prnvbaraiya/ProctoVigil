const User = {
  register: async (req, res) => {
    console.log("lol");
    return res.send("YAY");
  },
  login: async (req, res) => {
    console.log(req.body);
    return res.status(202).send("Success");
  },
};

export { User };
