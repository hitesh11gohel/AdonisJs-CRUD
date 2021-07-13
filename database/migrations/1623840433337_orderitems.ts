import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orderitems extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('item_no').primary()
      table.integer('order_no').unsigned().notNullable().references('order_no').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.integer('price_per_item').notNullable()
      table.decimal('amount').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
