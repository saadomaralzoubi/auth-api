'use strict';
const modelFolder = require('../models');
const express = require('express');
const routers = express.Router();

routers.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next()
    } else {
        next('invalid input')
    }
})
routers.post('/:model',async(req,res)=>{
    let createdData = await req.model.createRecord(req.body);
    res.status(201).send(createdData);
})

routers.get('/:model',async(req,res)=>{
    let allData = await req.model.readRecord();
    res.status(200).send(allData);

})
routers.get('/:model/:id',async(req,res)=>{
    let id = req.params.id;
    let oneData = await req.model.readRecord(id);
    res.status(200).send(oneData);

})

routers.put('/:model/:id',async(req,res)=>{
    let objectData =req.body;
   let id = req.params.id;
    let updateData = await req.model.updateRecord(objectData,id);
    res.status(201).send(updateData);

})
routers.delete('/:model/:id',async(req,res)=>{
    let id = req.params.id;
    let  deletedData = await req.model.removeRecord(id);
    res.status(204).send(`The data for ID : ${id} is deleted successfully`);

})
module.exports = routers;

