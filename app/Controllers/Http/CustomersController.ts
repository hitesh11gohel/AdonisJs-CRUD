import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Customers from "App/Models/Customer";

export default class CustomersController {
  // get all customer
  public async getCustomer({ response }: HttpContextContract) {
    const customer = await Customers.all();
    if (customer.length > 0) {
      return response.json({
        all_Customer: customer,
      });
    } else {
      return response.json({ message: "No Customers" });
    }
  }

  // get customer by Id
  public async getCustomerbyId({ params, response }) {
    const customer = await Customers.find(params.id);
    if (customer) {
      return response.json({ Customer_Info: customer });
    } else {
      return response.json({ message: "Customer not found" });
    }
  }

  // add Customers
  public async addCustomer({ request }: HttpContextContract) {
    const customer = await new Customers();
    customer.customer_id = request.input("customer_id");
    customer.customer_name = request.input("customer_name");
    await customer.save();
    return "Customer Added Successfully";
  }

  // update Customer
  public async updateCustomer({
    params,
    request,
    response,
  }: HttpContextContract) {
    const cust = await Customers.find(params.id);
    if (cust) {
      cust.customer_name = request.input("customer_name");
      await cust.save();
      return response.status(201).json({
        message: "Customer Updated",
        updated_customer: cust,
      });
    } else {
      return response.status(404).json({ message: "Customer Not Found" });
    }
  }

  // delete Customer
  public async deleteCustomer({ params, response }: HttpContextContract) {
    const customer = await Customers.find(params.id);
    if (customer) {
      customer.delete();
      console.log("Id :", customer);

      return response.status(200).json({ message: "Customer Deleted" });
    } else {
      return response.status(404).json({ message: "Customer Not Found" });
    }
  }
}
