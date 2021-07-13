import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LetestProducts extends BaseSchema {
  protected tableName = 'letest_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id').primary();
      table.string('product_name').notNullable();
      table.float('product_price').notNullable();
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
