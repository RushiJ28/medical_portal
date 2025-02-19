function returnStatus(res, code, err, msg, additionalData) {
  return res
    .status(code)
    .json({ err: err, msg: msg, status: code, ...additionalData });
}

module.exports = returnStatus;
