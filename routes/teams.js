const router = require("express").Router();
let Team = require("../models/team.model");

// get all route
router.route("/").get(async (req, res) => {
  let { sortProp, sortDirection, page, limit, filterBy } = req.query;
  let teams;

  try {
    let query;
    query = Team.find();

    // filter
    let filters = filterBy ? filterBy.split(";") : [];
    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i];
      if (!filter) break;

      let commaSplit = filter.split(",");
      let key = commaSplit[0]; // property
      let val = commaSplit[1]; // value
      let opt = commaSplit[2] || ""; // options

      console.log("key", key);
      console.log("val", val);

      // multi value
      if (val.split(":").length > 1) {
        query.where(key).in(val.split(":"));
      } else {
        // single value
        if (opt == "@stringmatch_any") {
          query.find({ [key]: { $regex: val, $options: "i" } });
        } else {
          query.where(key).equals(val);
        }
      }
    }

    // sort
    let sortQuery = { [sortProp || "_id"]: sortDirection || 1 };
    query.sort(sortQuery);

    // paginate
    let paginationOptions = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 15,
    };
    teams = await Team.paginate(query, paginationOptions);

    res.json(teams);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// get by id
router.route("/:id").get(async (req, res) => {
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
  //console.log("re2", req.body.axies);
  let newTeam;

  try {
    let { color, size, name, name2 } = req.body;
    newTeam = new Team(req.body);
    await newTeam.save();

    res.json(`New team added! [name:${name}]`);
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

    console.log("n", updated.n);
    console.log(id);

    if (updated.n == 0) res.json(`No Team found to update`);
    else res.json(`Team ${id} was updated! [name:${name}, name2:${name2}]`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// delete route
router.route("/:id").delete(async (req, res) => {
  try {
    let { id } = req.params;
    let deleted = await Team.deleteOne({ _id: id });

    if (deleted.deletedCount == 0) res.json(`No Team found to delete`);
    else res.json(`Team ${req.body.id} delted!`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// delete all route
router.route("/").delete(async (req, res) => {
  try {
    let deleted = await Team.deleteMany({});
    if (deleted.deletedCount == 0) res.json(`No Teams found to delete`);
    else res.json(`All Teams deleted!`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
