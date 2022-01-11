import { dbConect } from "utils/mongoose";
import Task from "models/Task";

dbConect();

export default async function handler(req, res) {
  const { method, body} = req
  switch (method) {
    case "GET":
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    case "POST":
    console.log(body);
   const newTask = new Task(body);
   const savedTask =  await newTask.save();
   return res.status(201).json(savedTask)
    default:
      res.status(400).json("method no supported");
  }
}
