import Application from "@ioc:Adonis/Core/Application";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import LetestProduct from "App/Models/LetestProduct";
import LetestProductImage from "App/Models/LetestProductImage";
import LetestProductImagesMapping from "App/Models/LetestProductImagesMapping";

export default class LetestProductsController {
  public async getAll({ response }: HttpContextContract) {
    try {
      const product = await LetestProduct.all();
      if (product.length > 0) {
        return response.status(200).json(product);
      } else {
        return response.status(201).json({
          message: "No product",
        });
      }
    } catch (err) {
      console;
    }
  }

  public async getById({ response, params }: HttpContextContract) {
    const result = await LetestProduct.find(params.id);
    if (result) {
      return response.json(result);
    } else {
      return response.json({ message: "This Product is Not Exist" });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const productName = request.input("productName");
    const productPrice = request.input("productPrice");
    const productImages = request.files("productImages");

    const productData = await LetestProduct.create({
      product_name: productName,
      product_price: productPrice,
    });

    if (productImages) {
      for (var i = 0; i < productImages.length; i++) {
        const image = productImages[i];

        const product_image =
          new Date().getTime().toString() + `.${image.extname}`;
        await image.move(Application.publicPath("productImages"), {
          name: product_image,
        });

        const product_id = productData.product_id;
        const image2 = await LetestProductImage.create({
          image: product_image,
        });
        const image_id = image2.image_id;

        await LetestProductImagesMapping.create({
          product_id: product_id,
          image_id: image_id,
        });
      }
      return response
        .status(201)
        .json({ message: "Product Created", productData });
    }
  }

  public async joinData({ response, params }: HttpContextContract) {
    const result = await Database.from("letest_product_images_mappings")
      .join(
        "letest_product_images",
        "letest_product_images_mappings.image_id",
        "=",
        "letest_product_images.image_id"
      )
      .join(
        "letest_products",
        "letest_products.product_id",
        "=",
        "letest_product_images_mappings.product_id"
      )
      .select("letest_products.product_id")
      .select("letest_product_images.image","letest_product_images.image_id")
      .where("letest_products.product_id", "=", params.product_id)
    return response.json({ result });
  }

  public async mayurs({ response, params }: HttpContextContract) {
    const result = await Database.from("letest_product_images_mappings")
      .innerJoin(
        "letest_products",
        "letest_products.product_id",
        "=",
        "letest_product_images_mappings.product_id"
      )
      .innerJoin(
        "letest_product_images",
        "letest_product_images.image_id",
        "=",
        "letest_product_images_mappings.image_id"
      )
      .where("letest_product_images_mappings.product_id", params.product_id);
    if (result) {
      // console.log('Result :',result)
      response.status(200).json({
        result: result[0].image,
      });
    } else {
      response.json({
        message: "image is not found.......",
      });
    }
  }

  public async DeleteRecord({response, params}:HttpContextContract){
    const result = await LetestProduct.find(params.id);
    if (result) {
      result.delete();
      console.log('deleted: ',result)
      return response
        .status(200)
        .json({ message: "LetestProduct Deleted Successfully" });
    } else {
      return response.status(404).json({ message: "LetestProduct Not Found" });
    }
  }
}
