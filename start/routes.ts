import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.group(() => {
  // product routes
  Route.get("/products", "ProductsController.getProducts");
  Route.get("/products/:id", "ProductsController.getProductById");
  Route.post("/products", "ProductsController.addProduct");
  Route.patch("/products/:id", "ProductsController.updateProduct");
  Route.delete("/products/:id", "ProductsController.deleteProduct");

  // customer routes
  Route.get("/customers", "CustomersController.getCustomer");
  Route.get("/customers/:id", "CustomersController.getCustomerbyId");
  Route.post("/customers", "CustomersController.addCustomer");
  Route.put("/customers/:id", "CustomersController.updateCustomer");
  Route.delete("/customers/:id", "CustomersController.deleteCustomer");

  // Order Route
  Route.get("/orders", "OrdersController.getOrders");
  Route.get("/orders/:id", "OrdersController.getOrderbyId");
  Route.post("/orders", "OrdersController.addOrder");
  Route.patch("/orders/:id", "OrdersController.updateOrder");
  Route.delete("/orders/:id", "OrdersController.deleteOrder");

  //orderItems Route
  Route.get("/items", "OrderItemsController.getAllOrders");
  Route.get("/items/:id", "OrderItemsController.getItemById");
  Route.post("/item/add", "OrderItemsController.addItem");
  Route.delete("/items/delete/:id", "OrderItemsController.deleteItem");

  Route.get(
    "/customer/items/:customer_id",
    "OrderItemsController.findProductByid"
  );
  Route.get(
    "/orders/items/:order_no/",
    "OrderItemsController.getItemsbyOrderNo"
  );
  Route.get("/joins", "OrderItemsController.innerJoin");
  Route.get("/three-joins/:order_no", "OrderItemsController.threeJoin");

  // Images
  Route.get("/image/product/get", "ProductImagesController.getAll");
  Route.get("/image/product/get/:id", "ProductImagesController.getById");
  Route.post("/image/product/add", "ProductImagesController.create");
  Route.patch("/image/product/update/:id", "ProductImagesController.update");
  Route.put("/image/product/update/:id", "ProductImagesController.update");
  Route.delete("/image/product/:id", "ProductImagesController.destroy");

  Route.get("/image/product/sorting", "ProductImagesController.Sorting");
  Route.get("/image/product/pagination", "ProductImagesController.Pagination");
  Route.get(
    "/image/product/all",
    "ProductImagesController.SortLimitPagination"
  );
  Route.post(
    "/image/product/all",
    "ProductImagesController.SortLimitPagination"
  );

  Route.get(
    "/letest-product-images/get",
    "LetestProductImagesController.getData"
  );
  Route.get(
    "/letest-product-images/:id",
    "LetestProductImagesController.getById"
  );
  Route.get("/mapping", "LetestProductImagesController.getDataFromMapping");
  Route.get(
    "/mapping/:product_id",
    "LetestProductImagesController.getDataFromMappingById"
  );

  Route.get("/multiple-images/get", "LetestProductsController.getAll");
  Route.get("/multiple-images/get/:id", "LetestProductsController.getById");
  Route.post("/multiple-images/add", "LetestProductsController.create");
  Route.get("/multiple-images/joindata/:product_id", "LetestProductsController.joinData");
  Route.get(
    "/multiple-images/mayurs/:product_id",
    "LetestProductsController.mayurs"
  );
  Route.delete(
    "/multiple-images/product/:id",
    "LetestProductsController.DeleteRecord"
  );
}).prefix("api");
