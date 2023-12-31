var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var productHelpers = require('../helpers/product-helpers')


var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelpers.getAllProducts().then((products) => {
    //console.log(products)
    res.render('admin/view-products', { admin: true, products });

  })


});

router.get('/add-product', function (req, res) {

  res.render('admin/add-product')
})


router.post('/add-product', (req, res) => {

  console.log(req.body)
  console.log(req.files.Image)


  productHelpers.addProduct(req.body, (id) => {

    let image = req.files.Image
    image.mv('./public/product-images/' + id + '.jpg', (err, done) => {

      if (err) {
        console.log(err)

      } else {
        res.render('admin/add-product')
      }
    })


  })

})

router.get('/delete-product/:id',(req,res)=>{
  let proId = req.params.id
  //console.log(proId)

  productHelpers.deleteProduct(proId).then((done)=>{
    res.redirect('/admin/')
  })
  
})

router.get('/edit-product/:id', (req,res)=>{
  productHelpers.getProductDetails(req.params.id).then((product)=>{
    console.log(product)
    res.render('admin/edit-product',{product})
  
  }) 
})

router.post('/edit-product/:id',(req,res)=>{
  let id = req.params.id
  console.log(id)
  productHelpers.updateProduct(id,req.body).then(()=>{
    res.redirect('/admin')
  })

  if(req.files.Image){
    let image = req.files.Image
    image.mv('./public/product-images/' + id + '.jpg')
  }
})
module.exports = router;
