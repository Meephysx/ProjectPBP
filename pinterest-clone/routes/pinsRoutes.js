const express = require("express");
const {createPin, getPinsByBoardId, deletePin, updatePin, searchPins, sharePins, reportPin }  = require("../controllers/pinsControllers")
const router = express.Router();

router.post("/create-pins", createPin);

router.get("/get-pins/:board_id", getPinsByBoardId);

router.delete("/delete-pins/:pin_id", deletePin);

router.put("/update-pins/:pin_id", updatePin);

router.get("/search-pins/:keyword", getPinsByBoardId);

router.get("/share-pins/:id", searchPins);

router.post("/report-pins/:id", reportPin);

router.get




module.exports = router;

