const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JW_SECRET;
//const upload = require('../../server');


/**
 *
 * Check Login
*/

const authMiddleware = (req, res, next ) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized'} );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized'} );
  }
}

/*const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('admin');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.redirect('admin');
  }
};*/

/**
 * GET /
 * Admin - Login Page
*/
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Find all your favorite recipes of all time right in one place"
    }

    res.render('admin/signin', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});


/**
 * POST /
 * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne( { username } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Admin Dashboard
*/
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Find all your favorite recipes of all time right in one place"
    }

    const data = await Recipe.find();
    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin - Create New Post
*/
router.get('/addRecipe', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Add New Recipe',
      description: 'Reciperealm, home of all good recipes.'
    }

    const data = await Recipe.find();
    res.render('admin/addrecipe', {
      locals,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Admin - Create New Post
*/
router.post('/addRecipe', authMiddleware, async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;

    const newRecipe = new Recipe({
      title: title,
      description: description,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),  // Split by comma and trim spaces
      steps: steps.split(',').map(step => step.trim()),
      created_by: req.userId
    });

    await newRecipe.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});



/*router.post('/addRecipe', authMiddleware, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.render('/dashboard', {
        msg: err.message
      });
    } else {
      if (req.file == undefined) {
        return res.render('/dashboard', {
          msg: 'Error: No File Selected!'
        });
      } else {
        console.log('File uploaded successfully:', req.file);
        try {
          const newRecipe = new Recipe({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients.split(',').map(ingredient => ingredient.trim()),
            steps: req.body.steps.split(',').map(step => step.trim()),
            image: `/uploads/${req.file.filename}`,
            created_by: req.user.id
          });

          await newRecipe.save();
          res.redirect('/dashboard');
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
      }
    }
  });
});
*/

/**
 * GET /
 * Admin - edit recipe
*/
router.get('/editRecipe/:id', authMiddleware, async (req, res) => {
  try {

    const locals = {
      title: "Edit Recipe",
      description: "Reciperealm, all the good things in one place",
    };

    const data = await Recipe.findOne({ _id: req.params.id });

    res.render('admin/editrecipe', {
      locals,
      data,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error);
  }

});


/**
 * PUT /
 * Admin - edit recipe
*/

router.put('/editRecipe/:id', async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;

    const updatedRecipe = {
      title: title,
      description: description,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      steps: steps.split(',').map(step => step.trim()),
      updatedAt: Date.now()
    };

    await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, { new: true });

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


/**
 * POST /
 * Admin - Register
*/
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password:hashedPassword });
      res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});


/**
 * DELETE /
 * Admin - Delete Post
*/
router.delete('/deleteRecipe/:id', authMiddleware, async (req, res) => {

  try {
    await Recipe.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});


module.exports = router;
