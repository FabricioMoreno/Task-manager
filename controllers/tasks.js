const Task = require("../models/Task")
const asyncWrapper = require("../middlewares/async")
const {createCustomError} = require("../erros.js/custom-error")

const getAllTasks = asyncWrapper( async (req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})

const getTask = asyncWrapper( async(req,res,next)=>{
        const task = await Task.findById(req.params.id)
        if(!task){
            return next(createCustomError(`No task wtith id ${req.params.id}`,404))
        }
        res.status(200).json({task})
})

const createTask = asyncWrapper( async (req,res,next)=>{
        const task = await Task.create(req.body)
        res.status(201).json({
            task
        })
})

const upadteTask = asyncWrapper( async(req,res,next)=>{
        const task= await Task.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return next(createCustomError(`No task wtith id ${req.params.id}`,404))
        }
        
        res.status(200).json({task})
})


const deleteTask = asyncWrapper( async(req,res,next)=>{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return next(createCustomError(`No task wtith id ${req.params.id}`,404))
        }
        res.status(200).json({task:null,status:"success"})
})


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    upadteTask,
    deleteTask
}