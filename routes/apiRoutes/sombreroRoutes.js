const router = require('express').Router();

//route to home
router.get('/', (req, res) => {
    res.render('index');
})


module.exports = router;