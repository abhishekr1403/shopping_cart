var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {

  let user=req.session.user
  //console.log(user)

  productHelpers.getAllProducts().then((products) => {
    //console.log(products)
    res.render('user/view-products', { products,user });

  })
    ;
});

router.get('/login', (req, res) => { 
  res.render('user/login')
})

router.get('/signup', (req, res) => {
  res.render('user/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((data) => {
    console.log(data)
  })

})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {

      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')

    } else {
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
module.exports = router;
