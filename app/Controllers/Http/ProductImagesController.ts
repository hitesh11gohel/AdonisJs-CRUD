import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import ProductImage from "App/Models/ProductImage";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProductImagesController {
  public async getAll({ response }: HttpContextContract) {
    const GetData = await ProductImage.all();
    if (GetData.length > 0) {
      return response.json(GetData);
    } else {
      return response.json({ message: "No Images of Product Available" });
    }
  }

  public async getById({ response, params }: HttpContextContract) {
    const result = await ProductImage.find(params.id);
    if (result) {
      return response.json(result);
    } else {
      return response.json({ message: "This File is Not Exist" });
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const productImg = request.file("productImg");
    if (productImg) {
      const imageName =
        new Date().getTime().toString() + `.${productImg.extname}`;
      await productImg.move(Application.publicPath("images"), {
        name: imageName,
      });

      const pro = new ProductImage();
      pro.product_img = `${imageName}`;
      pro.product_name = request.input("productName");
      pro.product_price = request.input("productPrice");
      await pro.save();
      return response.json(pro);
    }
  }

  // public async update({ params, response, request }: HttpContextContract) {
  //   const result = await ProductImage.find(params.id);
  //   if (result) {
  //     const img = request.file("productImg");
  //     const product_img = new Date().getTime().toString() + `${img?.extname}`;
  //     if (img) {
  //       await img.move(Application.publicPath("images"), { name: product_img });
  //     }

  //     if(result.$attributes.product_img === undefined)
  //     {
  //       result.product_img = product_img;
  //       result.product_name = request.input("productName");
  //       result.product_price = request.input("productPrice");
  //       console.log("New", result);
  //       result.save();
  //       return response.json({ message: "Product saved", result })
  //     }
  //     else{
  //         result.product_name = request.input("productName");
  //         result.product_price = request.input("productPrice");
  //         console.log("New", result);
  //         result.save();
  //         return response.json({ message: "Product saved", result })
  //     }
  //   }
  //   }
  //   else {
  //     return response.json({ message: "Product Not saved" });
  //   }
  // }

  // public async update({ params, response, request }: HttpContextContract) {
  //   const result = await ProductImage.find(params.id);
  //   if (result) {
  //     const img = request.file("productImg");
  //     const product_img = new Date().getTime().toString() + `.${img?.extname}`;
  //     if (img) {
  //       await img.move(Application.publicPath("images"), { name: product_img });
  //     }
  //     result.product_img = product_img;
  //     result.product_name = request.input("productName");
  //     result.product_price = request.input("productPrice");
  //     console.log("New", result);
  //     result.save();
  //     return response.json({ message: "Product saved", result });
  //   }
  //   else {
  //     return response.json({ message: "Product Not saved" });
  //   }
  // }

  public async update({ params, response, request }: HttpContextContract) {
    const result = await ProductImage.find(params.id);
    if (result) {
      const img = request.file("productImg");
      const product_img = new Date().getTime().toString() + `.${img?.extname}`;
      if (img) {
        await img.move(Application.publicPath("images"), { name: product_img });
        result.product_img = product_img;
        result.product_name = request.input("productName");
        result.product_price = request.input("productPrice");
        console.log("New", result);
        result.save();
        return response.json({ message: "Product saved", result });
      }
      result.product_name = request.input("productName");
      result.product_price = request.input("productPrice");
      console.log("New", result);
      result.save();
      return response.json({ message: "Product saved", result });
    } else {
      return response.json({ message: "Product Not saved" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const result = await ProductImage.find(params.id);
    if (result) {
      result.delete();
      return response.json({ message: "Product Deleted", result });
    } else {
      return response.json({ message: "Product is Not Exist" });
    }
  }

  public async Sorting({ response }: HttpContextContract) {
    const total = await Database.from("product_images").count("* as Data");
    const sortByName = await Database.from("product_images").orderBy([
      {
        column: "product_name",
        order: "asc",
      },
    ]);

    return response.json({
      message: "Sorted Product",
      sortByName,
      total,
    });
  }

  // public async SortLimitPagination({ response, request }: HttpContextContract) {
  //   const name = new ProductImage();
  //   name.product_name = request.input("product_name");
  //   const order = request.input("order");
  //   const page = request.input("page");
  //   const limit = request.input("limit") || 3;

  //   const result = await ProductImage.query()
  //     .where("product_name", "LIKE", `%${name.product_name}%`)
  //     .orderBy("product_name", order)
  //     .paginate(page, limit);
  //   return response.json(result);
  // }

  public async Pagination({ response, request }: HttpContextContract) {
    const page = request.input("page", 1);
    const limit = request.input("limit") || 4;

    const result = await Database.from("product_images").paginate(page, limit);
    const countRecord = await Database.from("product_images").count(
      "* as totalRecord"
    );
    const record = countRecord[0].totalRecord;
    const totalPage = Math.ceil(result.total / result.perPage);
    return response.json({ result, record, totalPage });
    // console.log("Record : ", countRecord[0].totalRecord);
    // console.log('Total :',result.total, 'perPage : ',result.perPage)
    // console.log('Page :' ,Math.ceil(result.total / result.perPage))
  }
}

