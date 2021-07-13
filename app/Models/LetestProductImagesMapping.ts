import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import LetestProductImage from "./LetestProductImage";
import LetestProduct from "./LetestProduct";

export default class LetestProductImagesMapping extends BaseModel {
  @column({ isPrimary: true })
  public product_image_id: number;

  @column()
  public image_id: number;

  @belongsTo(() => LetestProductImage)
  public letestproductimage: BelongsTo<typeof LetestProductImage>;

  @column()
  public product_id: number;

  @belongsTo(() => LetestProduct)
  public letestproduct: BelongsTo<typeof LetestProduct>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
