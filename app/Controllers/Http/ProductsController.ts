import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Products from 'App/Models/Product'

export default class ProductsController {

    // get all Products
    public async getProducts({response} : HttpContextContract) {
        const allProducts = await Products.all()
        if (allProducts.length > 0) {
            return response.json({
                products: allProducts
            })
        } else {
            return response.json({
                message: 'No Products'
            })
        }
    }

    // get product by id
    public async getProductById({params}) {
        const id = params.id
        const product = await Products.find(id)
        return {product}
    }

    //add product
    public async addProduct({request} : HttpContextContract) {
        const product = new Products()
        product.product_id  =  request.input('product_id')
        product.product_name = request.input('product_name')
        product.product_price  =  request.input('product_price')
        await product.save()
        return {'message' : 'Product Added Successfully'}
    }

    // update products
    public async updateProduct({params, request, response} : HttpContextContract) {
        const product = await Products.find(params.id)
        if(product)
        {
            product.product_name = request.input('product_name')
            product.product_price = request.input('product_price')
            product.save()

            return response.json({
                message : 'Product Updated Successfully',
                updated_product : product
            })
        }
        else {
            return response.json({message: 'Product is not found'})
        }
    }

    //delete product
    public async deleteProduct({params,response}){
        const product = await Products.find(params.id)
        if(product){
            product.delete()
            return response.json({message: 'Product Deleted Successfully'})
        }
        else
        {
            return response.json({message: 'Product is not found'})
        }

    }
    
}

