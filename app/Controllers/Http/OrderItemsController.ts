import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import OrderItem from "App/Models/OrderItem";
import Database from "@ioc:Adonis/Lucid/Database";

export default class OrderItemsController {
  // get all order items
  public async getAllOrders({ response }: HttpContextContract) {
    const result = await OrderItem.all();
    response.json({ result });
  }

  public async getItemById({ response, params }: HttpContextContract) {
    const item = await OrderItem.find(params.id);
    if (item) {
      return response.json(item);
    } else {
      return response.json({ message: "Item Not Found" });
    }
  }

  // add order item
  public async addItem({ request, response }: HttpContextContract) {
    const item = new OrderItem();
    item.order_no = request.input("order_no");
    item.product_id = request.input("product_id");
    let quantity = (item.quantity = request.input("quantity"));
    let ppi = (item.price_per_item = request.input("price_per_item"));
    item.amount = quantity * ppi;
    await item.save();
    response.status(201).json({ item });
  }

  // delete item
  public async deleteItem({ params, response }: HttpContextContract) {
    const result = await OrderItem.find(params.id);
    if (result) {
      result.delete();
      return response
        .status(200)
        .json({ message: "Item Deleted Successfully" });
    } else {
      return response.status(404).json({ message: "Item Not Found" });
    }
  }

  public async findProductByid({ params, response }: HttpContextContract) {
    const itemData = await Database.from("orders").where(
      "customer_id",
      "=",
      params.customer_id
    );
    return response.json(itemData);
  }

  public async getItemsbyOrderNo({ params, response }: HttpContextContract) {
    const result = await Database.from("order_items").where(
      "order_no",
      "=",
      params.order_no
    );
    return response.json(result);
  }

  public async innerJoin({ response }: HttpContextContract) {
    const JoinEx = await Database.from("order_items")
      .join("products", "order_items.product_id", "=", "products.product_id")
      .select(
        "order_items.item_no",
        "order_items.order_no",
        "order_items.price_per_item",
        "order_items.quantity",
        "order_items.amount",
        "order_items.product_id"
      )
      .select("products.product_name");
    return response.json(JoinEx);
  }

  public async threeJoin({ response, params }: HttpContextContract) {
    const order_no = params.order_no;
    const threeJoins = await Database.from("order_items")
      .join("orders", "order_items.order_no", "=", "orders.order_no")
      .join("customers", "orders.customer_id", "=", "customers.customer_id")
      .where('orders.order_no', order_no)
      .select(
        "order_items.item_no",
        "order_items.order_no",
        "order_items.price_per_item",
        "order_items.quantity",
        "order_items.product_id"
      )
      .select("customers.customer_name")
      .select("orders.total_amount");
    return response.json({Data : threeJoins});
  }
}
