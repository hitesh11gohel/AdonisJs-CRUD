import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LetestProductImages extends BaseSchema {
  protected tableName = 'letest_product_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('image_id').primary();
      table.string('image')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
