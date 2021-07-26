import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";

//@desc Create new message
//@route POST /api/message
//@access Private

const addMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const messages = new Message({
    name,
    email,
    message,
  });

  const createdMessage = await messages.save();
  res.status(201).json(createdMessage);
});

export { addMessage };
