const router=require('express').Router();
const {GetAll,GetProdById,AddProd,DeleteProd,UpdateProd,GetAll2}=require('../controller/products');
router.get("/all",GetAll);
router.get("/all2",GetAll2);
router.get("/getbyid",GetProdById);
router.post("/add",AddProd);
router.post("/del",DeleteProd);
router.post("/update",UpdateProd);
module.exports = router;