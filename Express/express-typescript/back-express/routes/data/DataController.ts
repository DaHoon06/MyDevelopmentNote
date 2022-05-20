import express from "express";
const DataController : express.Application = express();

DataController.get('/:keyword?',(req, res) => {
    console.log('검색 키워드 작성중...');
})

export default DataController;