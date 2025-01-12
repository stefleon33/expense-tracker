const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('hello Worlld')
})

module.exports = router