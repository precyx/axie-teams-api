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
  const color = req.body.color;
  const size = Number(req.body.size);

  let newTeam;

  try {
    newTeam = new Team({ color, size });
    await newTeam.save();
    res.json(`New team added! [color:${color}, size:${size}]`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// delete route
router.route("/remove").delete(async (req, res) => {
  Team.deleteOne({ _id: req.body.id }, err => {
    if (err) res.status(400).json("Error: " + err);
    res.json(`Team ${req.body.id} delted!`);
  });
});

module.exports = router;
