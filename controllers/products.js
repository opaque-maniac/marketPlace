const Product = require('../models/Product');

module.exports = async (req, res, next) => {
    const itemsPerPage = 10;
    const page = req.query.page || 1;

    try {
        const products = await Product.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);

        if (products.length == 0) {
            return res.status(404).send('No products found');
        }

        res.render('products', {products, page});
    } catch (err) {
        next(err);
    }
}