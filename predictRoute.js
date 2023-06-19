const router = require("express").Router();
const KNN = require('ml-knn');
const XLSX = require('xlsx');

function transposeArray(array) {
    const rows = array.length;
    const cols = array[0].length;
  
    const transposedArray = [];
  
    for (let j = 0; j < cols; j++) {
      const newRow = [];
      for (let i = 0; i < rows; i++) {
        newRow.push(array[i][j]);
      }
      transposedArray.push(newRow);
    }
  
    return transposedArray;
  }
  

router.post("/",async (req,res)=>{
    const temp=req.body.temp;
    const humidity=req.body.humidity;
    const workbook = XLSX.readFile('./dataset.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const dataArray = jsonData.map(row => Object.values(row));

    const x_data = dataArray.map(row => row.slice(0, 2).concat(row.slice(2 + 1)));
    x_data.splice(0, 1);
    const y_data=   dataArray.map(row => row.slice(0, 0).concat(row.slice(1 + 1)));
    const transposed_y = transposeArray(y_data);
    transposed_y[0].shift()
    const y=transposed_y[0];
    const knn = new KNN(x_data, y);
    const ans=knn.predict([temp,humidity]);
    res.status(200).json({label:ans});
    

})
module.exports = router;