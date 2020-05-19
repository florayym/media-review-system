import jwt from 'jsonwebtoken';
import config from './config.js'

const withAuth = function (req, res, next) {

  // expecting the refreshToken in the payload
  const refreshToken = req.cookies['refresh-token'];

  if (!refreshToken) {
    res
      .status(401)
      .send('Unauthorized: No token provided!');
  } else {
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send('Unauthorized: Invalid token!');
      } else {
        req.ID = decoded.ID;
        req.type = decoded.type;
        next();
      }
    });
  }
}

export default withAuth;