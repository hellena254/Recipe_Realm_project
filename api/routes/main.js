const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "Reciperealm",
      description: "Find all your favorite recipes of all time right in one place."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Recipe.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Recipe.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * Recipe :id
*/
router.get('/recipe/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Recipe.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Find all your favorite recipes of all time right in one place",
    }

    res.render('recipe', {
      locals,
      data,
      currentRoute: `/recipe/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});0


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Find all your favorite recipes of all time right in one place"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Recipe.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});

router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});

module.exports = router;
