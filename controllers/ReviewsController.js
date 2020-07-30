const viewPath = 'reviews';
const User = require("../models/User");
const Review = require("../models/Review");

exports.colorOptions = async (req, res) => {
  try {
    const colorOptions = await Review.colorOptions();
    res.status(200).json(colorOptions);    
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `Couldn't get the color options.`, error});
  }
};

exports.locationOptions = async (req, res) => {
  try {
    const locationOptions = await Review.locationOptions();
    res.status(200).json(locationOptions);    
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `Couldn't get the location options.`, error});
  }
};

exports.scoreOptions = async (req, res) => {
  try {
    const scoreOptions = await Review.scoreOptions();
    res.status(200).json(scoreOptions);    
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `Couldn't get the score options.`, error});
  }
};

exports.index = async (req, res) => {
  try {    
    let [queryLocation, queryColor, queryScore, queryDifficulty] = [{}, {}, {}, {}];
    if (req.query.location != '0') queryLocation = {location: req.query.location};
    if (req.query.color != '0') queryColor = {color: req.query.color};    
    if (req.query.score != 0) queryScore = {score: req.query.score};    
    if (req.query.difficulty != '') queryDifficulty = {difficulty: req.query.difficulty};    

    let reviews;
    if (JSON.stringify(req.query, null, 2) == '{}') {
      reviews = await Review
      .find()
      .populate('user')
      .sort({ updatedAt: 'desc' });
    } else {
      reviews = await Review
      .find(queryLocation)
      .find(queryColor)
      .find(queryScore)
      .find(queryDifficulty)
      .populate('user')
      .sort({ updatedAt: 'desc' });
    }

    let user = {};
    if (typeof (req.session.passport) == 'undefined') {
      req.session.passport = {};
    } else {      
      const { user: email } = req.session.passport;
      user = await User.findOne({ email: email });
    }

    // res.render(`${viewPath}/index`, {
    //   pageTitle: 'Scores',
    //   reviews: reviews,
    //   user: user,
    //   formData: req.query
    // });
    res.status(200).json(reviews);

  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the reviews', error});
  }
};

exports.show = async (req, res) => {
  try {
    // get review info
    const review = await Review.findById(req.params.id)
      .populate('user');

    // get current user info
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    // res.render(`${viewPath}/show`, {
    //   pageTitle: review.name,
    //   review: review,
    //   user: user
    // });

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({message: "There was an error displaying this blog"});
  }
};

exports.create = async (req, res) => {
  console.log("In controller, req.body:", req.body)
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });
    const review = await Review.create({ user: user._id, ...req.body });
    
    res.status(200).json(review);
    
  } catch (error) {
    res.status(400).json({message: "There was an error creating a new item in controller", error});
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    const review = await Review.findById(req.body.id);
    if (!review) throw 'The score can not be found.'

    const attributes = { user: user._id, ...req.body };
    await Review.validate(attributes);
    await Review.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'Update successfully.');
    res.redirect(`${req.body.id}`);

  } catch (error) {
    req.flash('danger', `Update failed. Error: ${error}`)
    res.redirect(`${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.body.id });
    
    res.status(200).json({message: "Yay."});
  } catch (error) {
    res.status(400).json({message: "There was an error deleting the blog"});
  }
};
