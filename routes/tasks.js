const express = require("express")
const router = express.Router()
const {getAllTasks,getTask,createTask,upadteTask,deleteTask} = require("../controllers/tasks")

router.route("/").get(getAllTasks).post(createTask)

router.route("/:id").get(getTask).patch(upadteTask).delete(deleteTask)


module.exports = router