import { dbConect } from "utils/mongoose";
import Task from "models/Task";
dbConect();
export default async function getTask(req, res) {
  const {
    method,
    query: { _id },
    body,
  } = req;
  switch (method) {
    case "GET":
      const task = await Task.findById(_id);
      if (!task) return res.status(404).json({ msg: "Taks no found" });
      return res.status(200).json(task);

    default:
      return res.status(400).json({ msg: "this method no supported" });
  }
}
