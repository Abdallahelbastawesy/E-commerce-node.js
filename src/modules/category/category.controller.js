import { categoryModel } from "../../../db/models/category.model.js";


const addCategory = async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);
    res.json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(400).json({ message: "Error creating category", error });
  }
};


const getAllCategories = async (req, res) => {
  const categories = await categoryModel.find();
  res.json({ message: "All categories", categories });
};


const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ message: "Category updated successfully", category });
};


const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  res.json({ message: "Category deleted successfully", category });
};

export { addCategory, getAllCategories, updateCategory, deleteCategory };
