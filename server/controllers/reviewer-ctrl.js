import Reviewer from '../models/reviewer.js';

import jwt from 'jsonwebtoken';
import config from '../config.js';

const getReviewerById = async (req, res) => {
  // await Reviewer.findById(req.params.id, function (err, reviewer) {

  /* Query by _id */
  /*
  await Reviewer.findById({ _id: req.params.id }, (err, reviewer) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }

    if (!reviewer) {
      return res
        .status(404)
        .json({ success: false, error: 'Reviewer not found' });
    }
    return res.status(200).json({ success: true, data: reviewer });
  }).catch(err => console.log(err));
  */

  /* Query by ID or any other field possible */
  await Reviewer.findOne({ ID: req.params.id }, (err, reviewer) => { // the schema field name is case sensitive
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }

    if (!reviewer) {
      return res
        .status(404)
        .json({ success: false, error: `Reviewer not found.` });
    }
    return res
      .status(200)
      .json({ success: true, data: reviewer })
  }).catch(err => console.log(err));
};

const getAllReviewers = async (req, res) => {
  await Reviewer.find({}, (err, reviewers) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err });
    }
    if (!reviewers) { // empty
      return res
        .status(404)
        .json({ success: false, error: `Reviewers not found.` });
    }
    return res
      .status(200)
      .json({ success: true, data: reviewers });
  }).catch(err => console.log(err));
};

const addReviewer = (req, res) => {
  const body = req.body;

  if (!body) {
    return res
      .status(400)
      .json({
        success: false,
        error: `You must provide a reviewer info!`,
      });
  }

  const reviewer = new Reviewer(body);

  if (!reviewer) {
    return res.status(400).json({ success: false, error: err });
  }

  reviewer
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: reviewer._id,
        message: 'reviewer added!',
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: err,
        message: 'reviewer not added!',
      })
    });
};

const reviewerLogin = (req, res) => {
  const { ID, password, type } = req.body;

  Reviewer.findOne({ ID }, (err, reviewer) => {

    if (err) {
      console.log(err);
      res
        .status(500)
        .json({
          success: false,
          error: 'Internal server error please try again!'
        });
    } else if (!reviewer) {
      res
        .status(401)
        .json({
          success: false,
          error: 'This ID does not exist please try again!'
        });
    } else if (reviewer.type !== type) {
      res
        .status(401)
        .json({
          success: false,
          error: 'Incorrect ID or password or type please try again!'
        });
    } else {
      reviewer.isCorrectPassword(password, function (err, match) {
        if (err) {
          res
            .status(500)
            .json({
              success: false,
              error: 'Internal server error please try again!'
            });
        } else if (!match) {
          res
            .status(401)
            .json({
              success: false,
              error: 'Incorrect ID or password or type please try again!'
            });
        } else {
          // Issure token
          const payload = { ID, type };
          const token = jwt.sign(payload, config.secret, { expiresIn: config.tokenLife });
          const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });

          // Set cookies
          res
            .status(200)
            // cookie CORS problem ??????
            .cookie('access-token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 5) })
            .cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 60 * 60 * 24 * 7) })
            .json({
              'access-token': token,
              'refresh-token': refreshToken,
              'ID': ID
            })
        }
      });
    }
  });
};

export default {
  getReviewerById,
  getAllReviewers,
  addReviewer,
  reviewerLogin
};