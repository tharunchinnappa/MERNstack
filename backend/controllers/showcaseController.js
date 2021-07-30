import asyncHandler from "express-async-handler";
import Showcase from "../models/showcaseModel.js";

//@desc Create a ShowcaseItem
//@route POST /api/showcase/
//@access private/Admin
const createShowcaseItem = asyncHandler(async (req, res) => {
  const item = new Showcase({
    user: req.user._id,
    name: "sample name",
    image: "",
    description: "sample description",
    category: "showcase",
    price: 0,
  });

  const createdShowcaseItem = await item.save();
  res.status(201).json(createdShowcaseItem);
});

//@desc Delete item
//@route DELETE /api/showcase/:id
//@access private/Admin
const deleteShowcaseItem = asyncHandler(async (req, res) => {
  const item = await Showcase.findById(req.params.id);
  if (item) {
    await item.remove();
    res.json({ message: "Item removed" });
  } else {
    res.send(404);
    throw new Error("Item not found");
  }
});

//@desc Update a ShowcaseItem
//@route PUT /api/showcase/:id
//@access private/Admin
const updateShowcaseItem = asyncHandler(async (req, res) => {
  const { name, image, description, price } = req.body;

  const showcaseItem = await Showcase.findById(req.params.id);

  if (showcaseItem) {
    showcaseItem.name = name;
    showcaseItem.image = image;
    showcaseItem.description = description;
    showcaseItem.price = price;
    const updateShowcaseItem = await showcaseItem.save();
    res.json(updateShowcaseItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

//@desc Fetch all ShowcaseItems
//@route GET /api/showcase
//@access public
const getShowcaseItems = asyncHandler(async (req, res) => {
  const showcaseItems = await Showcase.find();
  res.json(showcaseItems);
});

//@desc Fetch single item
//@route GET /api/showcase/:id
//@access public
const getShowcaseItem = asyncHandler(async (req, res) => {
  const item = await Showcase.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

export {
  getShowcaseItems,
  updateShowcaseItem,
  createShowcaseItem,
  getShowcaseItem,
  deleteShowcaseItem,
};
