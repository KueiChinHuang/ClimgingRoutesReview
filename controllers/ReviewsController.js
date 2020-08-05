const User = require("../models/User");
const Review = require("../models/Review");

const getUser = async req => {
  let user = {};
  if (typeof (req.session.passport) !== 'undefined') {
    const { user: email } = req.session.passport;
    user = await User.findOne({ email: email });
  }  
  return user;
}

exports.reviewOptions = async (req, res) => {
  try {
    const reviewOptions = await Review.reviewOptions();
    res.status(200).json(reviewOptions);    
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `Couldn't get the options successfully.`, error});
  }
};

exports.index = async (req, res) => {
  try { 
    const user = await getUser(req);

    // Set up search term
    let searchTerm = null;
    if (req.query.term !== '') {
      let t1 = req.query.term.split(' ');
      let t2 = "\"" + t1.join("\" \"") + "\"";
      searchTerm = { "$text": { "$search": t2 } }
    } 
    
    // Set up sort method
    let sortBy = {updatedAt: -1};
    if (req.query.sortBy !== '') {
      sortBy = {[req.query.sortBy]: -1}
    }
    
    // Get the reviews
    const reviews = await Review
      .find(searchTerm)
      .populate('user')
      .sort(sortBy);
      
    reviews.forEach(r => console.log(r.user.firstName));

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
    const user = await getUser(req);

    // res.render(`${viewPath}/show`, {
    //   pageTitle: review.name,
    //   review: review,
    //   user: user
    // });

    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({message: "There was an error displaying this review"});
  }
};

exports.create = async (req, res) => {
  // console.log("In controller, req.body:", req.body)
  try {
    const user = await getUser(req);
    const review = await Review.create({ user: user._id, ...req.body });
    
    res.status(200).json(review);
    
  } catch (error) {
    res.status(400).json({message: "There was an error creating a review", error});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);

    const review = await Review.findById(req.body.id);
    if (!review) throw 'The score can not be found.'

    const attributes = { user: user._id, ...req.body };
    await Review.validate(attributes);
    await Review.findByIdAndUpdate(attributes.id, attributes);

    res.status(200).json({message: "Update successfully"});

  } catch (error) {
    res.status(400).json({message: "There was an error updating the review"});
  }
};

exports.delete = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.body.id });
    
    res.status(200).json({message: "Yay."});
  } catch (error) {
    res.status(400).json({message: "There was an error deleting the review"});
  }
};

