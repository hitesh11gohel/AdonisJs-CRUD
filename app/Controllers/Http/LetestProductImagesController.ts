import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import LetestProductImage from "App/Models/LetestProductImage";
import LetestProductImagesMapping from "App/Models/LetestProductImagesMapping";

export default class LetestProductImagesController {
  public async getData({ response }: HttpContextContract) {
    const result = await LetestProductImage.all();
    if (result) {
      return response.json(result);
    } else {
      return response.status(404).json({ message: "There is No Data " });
    }
  }

  public async getById({ response, params }: HttpContextContract) {
    const result = await LetestProductImage.find(params.id);
    if (result) {
      return response.json(result);
    } else {
      return response
        .status(404)
        .json({ message: "This Id of Image is Not Exist" });
    }
  }

  public async getDataFromMapping({ response }: HttpContextContract) {
    const result = await LetestProductImagesMapping.all();
    if (result) {
      return response.json(result);
    } else {
      return response.json({ message: "Data Not Exist" });
    }
  }

  public async getDataFromMappingById({
    response,
    params,
  }: HttpContextContract) {
    // const result = await LetestProductImagesMapping.find(params.product_id);
    const result = await Database.from("letest_product_images_mappings").where("product_id", params.product_id);

    if (result) {
      return response.json(result);
    } else {
      return response
        .status(404)
        .json({ message: "This Id of Image is Not Exist" });
    }
  }
}
