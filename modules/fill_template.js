module.exports = (template, product) => {
  let output = template
    .replace(/{%PRODUCT_ID%}/g, product.id)
    .replace(/{%PRODUCT_NAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRODUCT_ORIGIN%}/g, product.from)
    .replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
    .replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
    .replace(/{%PRODUCT_PRICE%}/g, product.price)
    .replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
