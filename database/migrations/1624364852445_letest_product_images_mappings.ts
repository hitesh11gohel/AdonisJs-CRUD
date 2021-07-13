import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import LetestProduct from 'App/Models/LetestProduct';

export default class LetestProductImagesMappings extends BaseSchema {
  protected tableName = 'letest_product_images_mappings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_image_id');
      table.integer('image_id').unsigned().notNullable().references('image_id').inTable('letest_product_images').onDelete('cascade')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('letest_products').onDelete('cascade')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
