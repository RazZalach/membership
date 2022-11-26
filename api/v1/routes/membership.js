const router=require('express').Router();
const {Register,Login,Get_All_Active,Get_All_Active2,DeleteMember}=require('../controller/membership.js');
router.post("/reg",Register);
router.post("/log",Login);
router.get("/del/:Email",DeleteMember);
router.get("/all",Get_All_Active);
router.get("/all2",Get_All_Active2);
module.exports = router;