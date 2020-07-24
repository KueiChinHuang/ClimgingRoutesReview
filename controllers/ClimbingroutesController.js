// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = 'climbingroutes';
const User = require("../models/User");
const Climbingroutes = require("../models/Climbingroutes");

exports.index = async (req, res) => {
  try {    
    // <%= console.log(`In climbingroutes form, formData: ${JSON.stringify(formData, null, 2)}`)%>
    // <%= console.log(`In Index View, climbingroute: ${JSON.stringify(climbingroute, null, 2)}`)%>    
    // <%= console.log(`In Index View, /climbingroutes/${climbingroute.id}`)%>


    // console.log(`In controller, req.query: ${JSON.stringify(req.query, null, 2)}`);
    let [queryLocation, queryColor, queryReview, queryDifficulty] = [{}, {}, {}, {}];
    if (req.query.location != '0') queryLocation = {location: req.query.location};
    if (req.query.color != '0') queryColor = {color: req.query.color};    
    if (req.query.review != 0) queryReview = {review: req.query.review};    
    if (req.query.difficulty != '') queryDifficulty = {difficulty: req.query.difficulty};    

    let climbingroutes;
    if (JSON.stringify(req.query, null, 2) == '{}') {
      climbingroutes = await Climbingroutes
      .find()
      .populate('user')
      .sort({ updatedAt: 'desc' });
    } else {
      climbingroutes = await Climbingroutes
      .find(queryLocation)
      .find(queryColor)
      .find(queryReview)
      .find(queryDifficulty)
      .populate('user')
      .sort({ updatedAt: 'desc' });
    }

    /* // This would make the index shows nothing when people first come to this index page without searching for anything
    const climbingroutes = await Climbingroutes
    .find(queryLocation)
    // .find(queryColor)
    .find()
    .populate('user')
    .sort({ updatedAt: 'desc' });
    */

    let user = {};
    if (typeof (req.session.passport) == 'undefined') {
      req.session.passport = {};
    } else {      
      const { user: email } = req.session.passport;
      user = await User.findOne({ email: email });
    }

    res.render(`${viewPath}/index`, {
      pageTitle: 'Reviews',
      climbingroutes: climbingroutes,
      user: user,
      formData: req.query
    })

  } catch (error) {
    req.flash('danger', `There was an error displaying the reviews: ${error}`)
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    // console.log(req.params);
    // get climbingroute info
    const climbingroute = await Climbingroutes.findById(req.params.id)
      .populate('user');

    // get current user info
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    res.render(`${viewPath}/show`, {
      pageTitle: climbingroute.name,
      climbingroute: climbingroute,
      user: user
    });
  } catch (error) {
    // console.log(`Error in controller show: ${error}`);
    req.flash('danger', `There was an error displaying this blog: ${error}`);
    res.redirect(`${viewPath}`);
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New climbing route'
  })
};

exports.create = async (req, res) => {
  try {
    // console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });
    // console.log('User: ', user);
    const climbingroutes = await Climbingroutes.create({ user: user._id, ...req.body });

    req.flash('success', 'Review created successfully');
    res.redirect(`/climbingroutes/${climbingroutes.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this review: ${error}`);
    req.session.formData = req.body;
    res.redirect(`${viewPath}/new`);
  }
};

exports.edit = async (req, res) => {
  try {
    const climbingroute = await Climbingroutes.findById(req.params.id);

    const { user: email } = req.session.passport;
    user = await User.findOne({ email: email });

    if (climbingroute.user.toString() == user._id.toString()) {
      res.render(`${viewPath}/edit`, {
        pageTitle: 'Edit',
        user: user,
        formData: climbingroute
      })
    } else {
      throw 'You are not the author.'
    }

  } catch (error) {
    req.flash('danger', `Edit failed: ${error}`);
    res.redirect(`/${viewPath}/${req.params.id}`);
  }

};

exports.update = async (req, res) => {
  try {
    // console.log(`In controller, Update, req.body: ${JSON.stringify(req.body, null, 2)}`);
    // console.log(`In controller, Update, req.session.passport: ${JSON.stringify(req.session.passport, null, 2)}`);

    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    const climbingroute = await Climbingroutes.findById(req.body.id);
    if (!climbingroute) throw 'The review can not be found.'

    const attributes = { user: user._id, ...req.body };
    await Climbingroutes.validate(attributes);
    await Climbingroutes.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'Update successfully.');
    res.redirect(`${req.body.id}`);

  } catch (error) {
    req.flash('danger', `Update failed. Error: ${error}`)
    res.redirect(`${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Climbingroutes.deleteOne({ _id: req.body.id });
    req.flash('success', 'Delete successfully.');
    res.redirect(`/${viewPath}`);
  } catch (error) {
    req.falsh('danger', `Delete failed. Error: ${error}`);
    res.redirect(`/${viewPath}`);
  }
};

