const router = require("express").Router();
let Team = require("../models/team.model");

// get all route
router.route("/").get(async (req, res) => {
  //res.json([1, 2, 3]);
  let teams;

  try {
    let { sortProp, sortDirection, page, limit } = req.query;
    let sortQuery = { [sortProp || "_id"]: sortDirection || 1 };
    let paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
    };
    let query = Team.find().sort(sortQuery);
    teams = await Team.paginate(query, paginationOptions);

    res.json(teams);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// get by id
router.route("/:id").get(async (req, res) => {
  //res.json([1, 2, 3]);

  let team;

  try {
    team = await Team.findById(req.params.id);
    res.json(team);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// add route
router.route("/add").post(async (req, res) => {
  console.log("req", req.body);
  let newTeam;

  try {
    let { color, size, name, name2 } = req.body;
    newTeam = new Team(req.body);
    await newTeam.save();
    res.json(
      `New team added! [color:${color}, size:${size}, name:${name}, name2:${name2}]`
    );
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// update route
router.route("/:id").patch(async (req, res) => {
  try {
    let { id } = req.params;
    let { name, name2, color } = req.body;

    let updated = await Team.updateOne({ _id: id }, req.body);
    console.log(id);
    res.json(`Team ${id} was updated! [name:${name}, name2:${name2}]`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// delete route
router.route("/remove").delete(async (req, res) => {
  try {
    let { id } = req.body;
    let deleted = await Team.deleteOne({ _id: id });
    if (deleted.deletedCount == 0) res.json(`No Team to delete`);
    else res.json(`Team ${req.body.id} delted!`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
