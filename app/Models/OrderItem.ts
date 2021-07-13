import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Order from "App/Models/Order";
import Product from "App/Models/Product";

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true, columnName: "item_no" })
  public item_no: number;

  @hasOne(() => Order, {
    foreignKey: "order_no",
  })

  @column({ columnName: "order_no" })
  public order_no: HasOne<typeof Order>;

  @hasOne(() => Product, {
    foreignKey: "product_id",
  })

  @column({ columnName: "product_id" })
  public product_id: HasOne<typeof Product>;

  @column({ columnName: "quantity" })
  public quantity: number;

  @column({ columnName: "price_per_item" })
  public price_per_item: number;

  @column({ columnName: "amount" })
  public amount: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
