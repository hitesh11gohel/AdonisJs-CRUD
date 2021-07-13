import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import OrderItem from './OrderItem'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public order_no: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public order_date: DateTime

  @column()
  public total_amount: number

  @column()
  public customer_id: number

  @belongsTo(()=>Customer)
  public customer: BelongsTo<typeof Customer>

  @hasMany(()=>OrderItem)
  public OrderItems: HasMany<typeof OrderItem>
}