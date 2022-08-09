const express = require("express");
const { addProject, getAllProject , getProjectById, getProject, getFloorplanById, getFloorplan} = require("../controllers/projectcontroller");
const {addFloorplan} = require("../controllers/floorplancontroller")
const router = express.Router();

//user routes
router.route("/projects").get(getAllProject);
// router.route("/projects/").get(getAllProject);


//all of params

router.param("projectId", getProjectById);
router.param("floorplanId", getFloorplanById);

//
router.get("/project/:projectId", getProject);
router.get("/project/floorplan/:floorplanId", getFloorplan);



//admin routes
router.route("/project/add").post(addProject);
router.route("/project/add/floorplan").post(addFloorplan);




module.exports = router;
