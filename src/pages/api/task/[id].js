import { dbConect } from "utils/mongoose";
import Task from "models/Task";
dbConect();
export default async function getTask(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;
  switch (method) {
    case "PUT":
          try {
            const putTask = await Task.findByIdAndUpdate(id, body, { new: true});
            if (!putTask) return res.status(404).json({msg: 'Task no found'}); 
             
            
          } catch (error) {
            return res.status(500).json({msg: error.message})
          }
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Taks no found" });
        return res.status(200).json(task);
      } catch (error) {
          return res.status(500).json({msg: error.message})
      }

    case "DELETE":
        try {
          const deleteTask = await Task.findByIdAndDelete(id);
          if (!deleteTask) return res.status(404).json({msg: 'Task no found'});       
           return res.status(204).json({msg: 'Task Deleted'})
          
        } catch (error) {
          return res.status(500).json({msg: error.message})
        }
        
    default:
      return res.status(400).json({ msg: "this method no supported" });
  }
}
