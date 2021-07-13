import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_no').primary()
      table.date('order_date')
      table.decimal('total_amount').notNullable()
      table.integer('customer_id').unsigned().notNullable().references('customer_id').inTable('customers').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
