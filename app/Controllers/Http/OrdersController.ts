import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
    
    // get all Orders
    public async getOrders({response} : HttpContextContract){
        const order = await Order.all()
        if(order.length > 0){
            return response.json({
                orders: order
            })
        }
        else {
            return response.json({message:'No Order'})
        }
    }

    // get order by Id
    public async getOrderbyId({params, response}){
        const order = await Order.find(params.id)
        if(order){
            return response.json({order_Info: order})
        }
        else {
            return response.json({message: 'Order Not Found'})
        }
    }

    // add Order
    public async addOrder({request} : HttpContextContract){
        const order = await new Order()
        order.order_no = request.input('order_no')
        order.total_amount = request.input('total_amount')
        order.customer_id = request.input('customer_id')
        await order.save()
        return order
    }

    // update order
    public async updateOrder({params, request, response} : HttpContextContract){
        const OrderData = await Order.find(params.id)
        if(OrderData){    
            OrderData.total_amount = request.input('total_amount')
            OrderData.customer_id = request.input('customer_id')
            OrderData.save()

            return response.json({
                message: 'Order Updated Successfully',
                updated_order : OrderData
            })
        }
        else{
            return response.status(404).json({message: 'order Not Found'})
        }
    }

    // delete order
    public async deleteOrder({params, response} : HttpContextContract){
        const order = await Order.find(params.id)
        if(order)
        {
            order.delete()
            return response.status(200).json({message: 'Order Deleted'})
        }
        else {
            return response.status(404).json({message: 'Order Not Found'})
        }
    }
}
