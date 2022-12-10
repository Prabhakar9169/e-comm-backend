import Products from "../models/productModel.js"
import AbstractOptions from "../utils/AbstractOptions.js"
import catchApiError from "../utils/catchApiError.js"
import AbstractApplicationError from "../utils/AbstractApplicationError.js"



const createProduct =  catchApiError( async (req , res , next)=>{
         const product=  await Products.create(req.body)
         res.status(201).json({
            status:'success',
            data : {
                product
            }
         })   
})


const getPtoduct =  catchApiError(  async (req, res , next)=>{
   
        let query = Products.find()
        // Abstraction 
        const options = new AbstractOptions(query , req.query)
        options.filter().sort().fieldFilter().pagination()
    
        const product =  await query
        res.status(200).json({
           status:'success',
           result : product.length,
           data :  product
        })   
})

const getAggregateProduct =  catchApiError (async (req , res , next)=>{
   const aggregate =   await Products.aggregate([
    {
      $match :{
        price : {
          $gt : 40 ,
          $lte : 50
        }
      }
    },{
      $group : {
          _id : '$category' ,
          totalPrice : {$sum : '$price'},
          avgRating : {$avg : '$price'},
          count : {$sum : 1},
          minPrice : {$min : '$price'},
          maxPrice : {$max : '$price'}
      }
    },{
      $addFields : {
        category : '$_id'
      }
    },{
      $project : {
         _id : 0
      }
    },{
      $sort : {
        category : 1
      }
    }
    ])
    res.status(200).json({
      status:'success',
      result : aggregate.length,
      data : aggregate
   })
  
})


const getUniqueProduct =  catchApiError(async (req, res , next)=>{
      let query = Products.findOne(req.query)
      const product=  await query
      if(!product){
        return next(new AbstractApplicationError('No resource Found' , 404))
      }

      res.status(200).json({
         status:'success',
         result : product.length,
         data :  product
      })
    
})

const getProductById =  catchApiError(async(req , res , next)=>{
      const product = await Products.findById(req.params.id)
      res.status(200).json({
        status :'success',
        data : product
      })
})

const updateProduct =  catchApiError(async (req , res , next)=>{
        const product = await Products.findByIdAndUpdate(req.params.id, req.body ,{
          new : true
        })
        res.status(200).json({
          status :'success',
          data : product
        })
})

const updateProductAfterFiltring =  catchApiError(async (req , res , next)=>{
      const product = await Products.updateMany(req.query, req.body ,{
        new : true
      })
      res.status(200).json({
        status :'success',
        result : product.length ,
        data : product
      })
   
})

const deleteProduct =  catchApiError(async (req , res , next)=>{
      const product = await Products.deleteMany(req.body)
      res.status(200).json({
        status :'success',
        result : product.length ,
        data : product
      })
})

export {getPtoduct , createProduct , getAggregateProduct , getUniqueProduct, getProductById , updateProduct , updateProductAfterFiltring , deleteProduct}