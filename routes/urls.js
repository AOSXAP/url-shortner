const express = require('express');
const db = require("../main/startup");
const router = express.Router();

router.get('/:id', async(req,res)=> {
    const url = await db.findurl(req.params.id);
    res.redirect(url.actualurl);
})

module.exports = router;