/**
 * Responds to an HTTP request using data from the request body eg.
 *
 * {
 *    "input": 2
 * }
 */
exports.pirpleBackend = (req, res) => {
   let input = req.body.input;

   res.status(200).send(`${input ** 2}`);
};
