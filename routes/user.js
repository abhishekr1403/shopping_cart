var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
var userHelpers = require('../helpers/user-helpers')

/* Middlewares */

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', async function (req, res, next) {

  let user=req.session.user
  //console.log(user)

  cartCount=null
    if(req.session.user){
      cartCount= await userHelpers.getCartCount(req.session.user._id)
    }

  productHelpers.getAllProducts().then((products) => {
    //console.log(products)
    
    res.render('user/view-products', { products,user,cartCount});

  })
    
});

router.get('/login', (req, res) => { 
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
  }
  
})

router.get('/signup', (req, res) => {
  res.render('user/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((data) => {
    req.session.loggedIn=true
    req.session.user=data
    res.redirect('/')
  })

})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {

      req.session.loggedIn=true
      req.session.user=response.user //session starting
      res.redirect('/')

    } else {
      req.session.loginErr="Invalid username and password!"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

router.get('/cart',verifyLogin,async(req,res)=>{
  let user=req.session.user
  let products=await userHelpers.getCartProducts(req.session.user._id)
  console.log(products)
  res.render('user/cart',{user,products})
})

router.get('/add-to-cart/:id',(req,res)=>{
  let id=req.params.id
  //console.log(id)
  //console.log("api calls")
  userHelpers.addToCart(id,req.session.user._id).then(()=>{
    res.json({status:true})
  })
})

router.post('/change-product-quantity',(req,res)=>{
  console.log(req.body)
  userHelpers.changeProductQuantity(req.body).then((response)=>{
    
    res.json(response) 
    
  })
})

router.post('/remove-cart-product',(req,res)=>{
  userHelpers.removeCartProduct(req.body).then((response)=>{

    res.json(response)
  })
})

router.get('/place-order',verifyLogin,async (req,res)=>{
  let total = await userHelpers.getTotalAmount(req.session.user._id)
  res.render('user/place-order',{total})
})

router.post('/place-order',(req,res)=>{
  console.log(req.body)
  
})
module.exports = router;
 