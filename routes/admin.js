var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var productHelpers= require('../helpers/product-helpers')


var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

/* GET users listing. */
router.get('/', function (req, res, next) {

  let products = [
    {
      name: "IPHONE 14",
      category: "Mobile",
      description: "This is a good mobile phone.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkGTElZlB50snKmlWtSaGPC31bvVKvm9Nfg&usqp=CAU"
    },
    {
      name: "POCO M2 PRO",
      category: "Mobile",
      description: "This is a good mobile phone.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlC5L8U7Y9AbpNhoc5Fe8zdlYmRbpXDReEcQ&usqp=CAU"
    },
    {
      name: "REALME GT MASTER",
      category: "Mobile",
      description: "This is a good mobile phone.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEhISFRUVFRUWFxAVFxUVEBUVFhYWFxYSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8PFysZFR0rKysrLSsrKy0rLSsrLS0tLjg3KzcrKy0rOC0rKzYrLSstNystKzctNzctKy0rLSsrN//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAECAwUHBgj/xABOEAACAQICBQYHCwkGBwEAAAAAAQIDEQQhBRIxQVEGYXFzkaETIoGSsbKzFBYjMjRUYoPR0/AkM0JEgqK0wdIHRVJTwuJydJOUo+HxFf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwDuIAAAAAAAAB4jlLpydSpUo0pyhTpPVnODtOc7JuKks4xV0nbNu/Asmj24OLVK+dl3ym33yuW+GfD1vtL5TXawcSliLbbdsvtKe6HwXbL7R5NduBxF4h8F2y+0teJf4cvtHk13AHDXin+HL7TWaQq4qvUjRw81SSV6ldpy2txUIpvNtxl2Xvmh5NfQoPnvBYSdTWjDSUpyg0pKNnqvZZrXy2PsJ+F0JXm2njqq4eL3fHJiu6g4r7169r+763mf7yLV5L11/eFfsf8AWMTXdAcEnyfrr9fxHY/6y+hoPEyeqsdW5243suLeuMV3gHF48la7/vCt5i/rLJcmK97f/oVunU/3jE12sHDVi9KaJqQrQxLxWH1kqlGaakot21rOT3v4yatfNWudp0ZjoYilTrQ+LUipK+1XWx862CxUkAEAAAAAAAAAAAAAAAAA5TrXliHxr1X2zkdWOTrbX66r68jXKV53SeLq0nDUkoycbPVSc75WWq0023J5u/CxocPpiaq+PKck02s7PLfZWXHduNvypwUm9aGbe2G/NLNGgwGh8VKXhHC0aUVFRe1RX6MVfgmvKzbLevGza1rtZpW28+/oJsZXu7JZ3stivnZc2ZZh9JUqsLSShK6y/R2PYZJbX0/yRasUbLWzM4Jbb35iyWrzkGMkYJ2nN89B9tCk36TB4vOZcIrSm+Ko92HofaSqs0LoOlhpzdNzeslFKTTUIJykoRslleT233G+0c/HiuGs/wB1ogKpbMmaEh8JUllZKKWy95XbfYl3gbmbyIdedlck1JWRr8VK4RghGVR8EbClTUVqrZve9swYOO8lxjZgZ4uxHlIySlvMLAg6XjrUKye+lUX7jPeci1bCpbo1cRFdCr1EjxOkYfA1eqqeoz2/I35N9difb1DPSxvAAZUAAAAAAAAAAAAAAAAOTLbX66r68jrJyXfX66r68jXKV5LldVWsld86fxM1FJysru2fHoNNoHHVMPiKaUk4VI6zgtmrfbJbnl05rnRs+UkIzm9aWrsSlt3LKyzfkNPorR9NVNfwuu1uScd6eaebzS7EbR6blFo3UvUh8VtOUd17PxvxxMlF5eSPqonxxKqU89pCas2lut6EKM1Z5+RegxSZfWl6F6DC5ALmak/Gl9T/AA9Aja3OSKXx5fU/w9ElVJW1ozYeThO8HZ2z4NLO0jFR2supS8fyMDe4bEKtG6ys3FrepLar+VPoaMFanma/BtwlrR2vNx3StufPbfuNw7SSks08+cCmGjvM28FE8wi6pwLYrMumXRQEbSa+Aq9VU9RnseRvyb67E+3qHktKL4Ct1VT1Get5G/JvrsT7eoZ6WN4ADKgAAAAAAAAAAAAAAAByP9Kv11X15HXDkLfjV+uqevI1yleH5S4hXWSvn42/NRyvwy9J5zR9f4fJ5ar27W8rJeXuue5x+AhVdpRTVrZOzyyv02ts4EGhoKjTd4xd+OsvsNI3ej8Vg1hGnr+6nLJePq21l+wlq3259xG17uT52uyyIsMGou6v5Xl3Ik8edt8127uxRmoUoSU3O/iw1kla7evCKWf/ABN+Qy4zDYWk3etrKLcXqrNyurNNpJJpt2z2LPO6gyVyL7pje2d7XtfNK3TxyIJtWph2/g41XmknJKMWrPxntd3KMst115JFH48uil/D0TWRqt2tfble2rtyzNlRfjT6KP8AD0QqVTdrlKXxn0W+3+Rji95kg7P8ZgSk7O/BErRNW8pRv9K3Dc/SjXyndE3Q0FrSk9iyVk962vmt6QNoUijIoraXNWQRhuZ4IjU82TI5ARdLu1Ct1VT1Get5GfJvrsT7eoeO0zL4Cr1VT1Gew5GfJvrsT7eoZ6WN6ADKgAAAAAAAAAAAAAAAByCMk5V3nZ1aj7ZM6+cZoS/O9ZP1ma5SodRRv+l3GNqP0u4VHmY2zaLnq/S7ij1fpdxYy1sC56v0u4xuMOD7ijLWwL1q8/cX05Wb6KP8PRMBIp7XbhSt/wBvRJVjLruxfGb/ABtsWyfExwmt21+hbwJUpO2WRttD4PUp+NnrS1s89yV+41+jaDnJNpaq2p7+b0G5liE3bZ3LoQFEvB+NBLnhsUlbbfc+exKVVTi2rq2TT2p8H2rtIs6mSMuHqRjJ62Wuo2e66bVuCfjLp8gRkw6zJCMUVmZrbgNdpuXwFXq5+qz2XImaeGaW6viE/wDrTfoaPG6d/M1ern6jPW8g/wAxU/5nEe0ZnpY9IADKgAAAAAAAAAAAAAAABxlR1ZVo8Ks12SZ2Y4vX/OYjrqnrs1yla+bzMbZZUgr7CxwXA2jI2WNljguBRwXAC9ssbLXTXAtdNcAL08yZh/0uNqP8PRNeqa4GwpNJz4/BLye56JKRXESSJeCjqLWaV3nbeluRDw9G71ns3LjwfQS5SuFTfdOWS7imJqqxFU7K5Rzu+gDY05bOOX/slQzVnmtlnzmsp1M1zsm052uBKws/BtRd3GTsm9sW9kXxT2Lp7Ni8kalS1snsaJ2GquS1ZfGjlf8AxLdLy7+e4RD05+Yq9XU9VnseQ9O2Gk/8VfEP/wA045eaeO04vgavV1PVZ7TkT8l+uxPt6hnpY3wAMqAAAAAAAAAAAAAAAAHFq7+ExHXVPWZ2k4rWa8LiL/51T1ma5StXUeZY2ZpuPB9pY3Hg+02jE2WtmVuPB9pa5R4PtAxNlC9uPB9pS8eD7QLCVFXnLh8F7CiR9aPB9pIi85fV+wokqxmUzJB5EZSJEJWQF1SQpvMjeF2/jIujPvAnUZbyV4TNc34sQqMrIy05b+IE+ErSSJMqrj43+HvjvXZ3pGuw8ryvwJuvkBn0v+YrdXU9VnseRHyX67E+3qHisS74WpxVKqvNjJfyPa8h/kq67E+3qGeiN+ADKgAAAAAAAAAAAAAAABxLEP4bEddU9ZnbTh+Ll8NiOuqeszXKVAmyxsTmuKMbmuKNoqy1sOa4otc1xQBspco5rii3XXFAVRKjLxpfV+wokNTXFEjW8aX1fsKRKsZYsvcrmKCL3kgqy5lpZ+QwXM9N2QEpO+XAvdTOyIsp2Rkw19vlCNjSySXaZXUztzkOFTf5DLh2nK72L0gbOsrYWs3vp1rdFpHteQ3yRddifb1DwmIrXwtVLYoVU/LGUrfvI91yE+SLrsT7eoZ6I9CADKgAAAAAAAAAAAAAAABwvG/nsR11T1md0OE45/D4jrqnrM1yla6aXBFuquBdJlhtFHFcEUcVwRVloBxXBFuquCLigFqiuCJdON5y+r9hSIqJdFXlL9j2NIlWM1zHUZfMxSeYVWCzMjKRLo5gFu6TJKVlZf8AwtvvMTlmEZ41G8lu/FyfSdslwu28/Ka+kuz08xOpS3vp6Xx8gE7FYVLD1ZRk03TqN5+K/EeTjv8ASe+5B/JF1uI9vUPA46dsPNPb4Kfa4v7T3vIH5HHrcR7eoZ6I9EADKgAAAAAAAAAAAAAAABwnHW8PiOuqeszuxwbHv8oxHXVPWZrlKiNR5+4taj9LuLZMtbNouaj9LuLWo8/cUZaBc1H6XcUerz9xayjAuWrz9xJoO2v0w9jSIiJmGt4754expEqxWTyLFBmWpIomFW2b2GaMbZX+0sTsVcrLnYQlnsFGlfyGOJIwyvkFSKcUlfd6TNRz8eWUV323dBHl42WxIpVknqw3XS7wibjqjlSqyf8Al1Lea8zo3ID5HHrcR7eoczxs70qj3eDnl+yzpn9n/wAij1uI9vUM9D0YAMqAAAAAAAAAAAAAAAAHBNIP8oxHXVPWZ3s4FpVWxOJXCvUXZJo1ylQ5FrMcoItcEbRkZQscEW+DXADIyhZ4NcB4JcAL0ScPPOfTD2NIhqkuBOwLTdTZlKHsaRKsVqqT3FVFpGayuXOCfEKwKJRp7fxYkOPAsmwLIp7Xx7jJUnq5LaXUlmuYpNXl+OwIz0H4uXOHTKYbLo4EycAIuLVqNRLK1OfR8V951D+z75FHrcR7eoct0rWUaFV7lTnn+yzqP9na/Io89Wu10eGqGeh6UAGVAAAAAAAAAAAAAAAADjPL3Q8sLiqlRr4KvJzjP9FSl8eDe53u+hnZjFicPCpFwqRjOL2xklKL6Uyy4PnSVRcUU8IuKO5S5FaPbv7lp+TWS7Ey33kaP+aw7Z/aa9Jjhrqx4oeFjxR3L3kaP+aw7Z/aVjyK0ev1Wn5dZ+lj0Y4Z4aPFFPDR4o7s+Rmj/mtLsa/mWe8nR/zWHbP7R6McM8NHijTaQx9bC1/DU0qlOokpR2ptN2Tt8WSTsuK47vo1citHr9Vp/vP+ZWfIvR7v+S088mlrJdiZLTHzyuV9R/qNTySl92PfbV+Y1fOl92fQPvD0b81h5JVF/qLnyG0c/wBVh501/qJqvn+PLCqlb3BV86X3ZR8r6vzGr50vuzv/ALxNHfNY+dU/qKx5C6OX6rDyym/TIaOAe/Cr8xqedL7vikUXK+r8xq+dL7s+gZchtHP9Vh2zXokW+8PR3zWPnVP6ho4GuWdX5hV86X3ZcuXFRbcBU8+X3Z3r3h6O+ax86p/UUfILRvzWPnVP6ho+eq+nMXpKpDC0sO4qclenG8qk7O+q5NK0clu6T6W5M6MeEwtGhJpyhDx5LY5yblNrm1my7ROgcLhL+56FKm3tlGKUnzOW1myGgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z"
    },
    {
      name: "PIXEL 7",
      category: "Mobile",
      description: "This is a good mobile phone.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc0w2fTKIM-PYtSYzFz2bNrqqunE4gGJ8EDA&usqp=CAU"
    },


  ]

  res.render('admin/view-products', { admin: true, products });
});

router.get('/add-product', function (req, res) {
  
  res.render('admin/add-product')
})


router.post('/add-product',(req,res)=>{

  console.log(req.body)
  console.log(req.files.Image)

  
  productHelpers.addProduct(req.body,(id)=>{

   let image=req.files.Image
   image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{

    if(err){
      console.log(err)

    }else{
      res.render('admin/add-product')
    }
   })
    

  })
  
})
module.exports = router;
