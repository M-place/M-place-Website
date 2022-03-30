import { StatusCodes } from "http-status-codes";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// Add a new product
const addProduct = async (req, res) => {
  const { name, SKU, marque, description, category, filters } = req.body;

  const product = new Product({
    name,
    SKU,
    marque,
    description,
    categoryId: category,
    Filter_list: filters,
  });

  if (!name || !SKU || !marque || !description || !category) {
    throw new BadRequestError("please provide all values");
  }
  const isCategoryExist = await Category.find({ _id: category });
  if (!isCategoryExist) {
    throw new BadRequestError("Category id does not exist !!");
  }

  const prod = await Product.create(product);
  res.status(StatusCodes.OK).json({ prod });
};

// Get all products
const getAllProducts = (req, res) => {
  Product.find({})
    .populate("categoryId")
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get product by id
const getProductById = async (req, res) => {
  await Product.find({ _id: req.params.id })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("The product does not exist")
        : res.status(StatusCodes.OK).json(val[0]);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Update product by id
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const newProduct = new Product({
    _id: req.params.id,
    name: req.body.name || product.name,
    SKU: req.body.SKU || product.SKU,
    marque: req.body.marque || product.marque,
    description: req.body.description || product.description,
    categoryId: req.body.category || product.categoryId,
    Filter_list: req.body.filters || product.Filter_list,
  });

  Product.updateOne({ _id: req.params.id }, newProduct)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product updated successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete product by id
const deleteProduct = async (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Product Deleted successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get poduct by category name
const getProductByCategory = async (req, res) => {
  await Category.find({ name: req.params.category })
    .then(async (cat) => {
      await Product.find({ categoryId: cat[0]._id })
        .then((val) => {
          val.length == 0
            ? res.status(StatusCodes.OK).json("No products to show")
            : res.status(StatusCodes.OK).json(val);
        })
        .catch((error) => {
          throw new BadRequestError(error);
        });
    })
    .catch((err) => {
      throw new BadRequestError(err);
    });
};

// Get product by marque name
const getProductByMarque = async (req, res) => {
  await Product.find({ marque: req.params.marque })
    .then((val) => {
      val.length == 0
        ? res.status(StatusCodes.OK).json("No products to show")
        : res.status(StatusCodes.OK).json(val);
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Add filters to the product
const addFiltersToProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    !fil.Filter_list.includes(val) ? fil.Filter_list.push(val) : ""
  );
  Product.updateOne({ _id: req.params.id }, fil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filters added to Product successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Delete filters form a product
const deleteFiltersFromProduct = async (req, res) => {
  const fil = await Product.findById(req.params.id);
  req.body.filters.map((val) =>
    fil.Filter_list.includes(val)
      ? fil.Filter_list.splice(fil.Filter_list.indexOf(val), 1)
      : ""
  );
  Product.updateOne({ _id: req.params.id }, fil)
    .then(() => {
      res.status(StatusCodes.CREATED).json({
        message: "Filters deleted from Product successfully!",
      });
    })
    .catch((error) => {
      throw new BadRequestError(error);
    });
};

// Get product filter names
const getProductFilters = (req, res) => {
  var result = [];
  Product.findById(req.params.id)
    .populate({
      path: "Filter_list",
      populate: {
        path: "Variable_list",
        model: "Variable",
      },
    })
    .then((val) => {
      val.Filter_list.forEach((val) => {
        val.Variable_list.forEach((val) =>
          !result.includes(val.name) ? result.push(val.name) : ""
        );
      });
      res.status(StatusCodes.OK).json({ filter_names: result });
    });
};

const getFilteredProducts = (req, res) => {
  const searchFilters = req.body.filters;
  const sf = [
    { value: "XL", variable: "Size" },
    { value: "Pink", variable: "Colors" },
  ];
  
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductByMarque,
  addFiltersToProduct,
  deleteFiltersFromProduct,
  getProductFilters,
};
