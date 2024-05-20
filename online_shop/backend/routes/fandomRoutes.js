const express = require('express');
const router = express.Router();
const fandomController = require("../controllers/fandom/fandomControllers");
const { upload } = require("../aws/aws");

router.get('/fandoms', fandomController.getAll);
router.get('/fandoms/:id', fandomController.getById);
router.get('/fandoms/by-author/:author_id', fandomController.getFandomByAuthorId);

router.post('/fandoms/add-fandom', upload.single('coverImage'), fandomController.addFandom);

module.exports = router;
