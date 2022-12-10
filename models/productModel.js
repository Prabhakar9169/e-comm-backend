import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   title : {
        type : String,
       
    },
    price : {
        type : Number,
       
    },
    discountPercentage : Number,
    rating : Number ,
    stock : {
        type : Number,
    },
    type : {
        type : String,
    },
    brand: {
        type : String,
    },
    category : {
        type : String,
    },
    discount : {
        type : Boolean,
    },
    thumbnail : {
        type : String,
    },
    images : {
        type : [String]
    }})
// } , {
//     toJSON : {virtuals : true},
//     toObject : { virtuals : true}
// })


//  Virtual Properties

// productSchema.virtual('categories').get(function(){
//     // this
//     if(this.price >1200) return'Premium'
//     else if(this.price > 400 && this.price<= 1200) return 'Mid Range'
//     return "Low Range"
// })



productSchema.pre( /^find/ , function(next){
    const data = ["MacBook Pro" , "Samsung Universe 9" , "HP Pavilion 15-DK1056WM", "Infinix INBOOK" ,  "Leather Hand Bag"]
    const randomNumber = Math.floor(Math.random()* data.length)
    this.findOne({name : data[randomNumber]})
    next()
})

productSchema.post(/^find/ , function(doc , next){
    console.log('Post Middleware');
    next()
})


const Products = mongoose.model('Product' , productSchema)

export default Products

