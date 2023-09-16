export const commands = {
  getAllUsers: { url: "regularaccount/", method: "GET" },
  createUser: { url: "regularaccount/", method: "POST" },
  authUser: { url: "login/", method: "POST" },

  changeUser: { url: "regularaccount/", method: "PATCH" },
  deleteAccount: { url: "regularaccount/", method: "DELETE" },
  createUserPhoto: { url: "core/images/", method: "POST" },
  changeUserPhoto: { url: "core/images/", method: "PATCH" },
  resetPassword: { url: "password/reset_request/", method: "POST" },
  resetPasswordAfterCode: { url: "password/reset/", method: "POST" },
  changePassword: { url: "changePassword/withoutOldPassword/", method: "PATCH" },

  getProducts: { url: "core/item/", method: "GET" },
  getCategory: { url: "category/", method: "GET" },
  getSubCategory: { url: "subcategory/", method: "GET" },
  getCategoriesByShop: { url: "storecategory/", method: "GET" },
  getStore: { url: "store/", method: "GET" },
  
  sendOrder: { url: "core/order/", method: "POST" },
  getOrders: { url: "core/order/", method: "GET" },
  getBanners: { url: "core/banner/", method: "GET" }
};
