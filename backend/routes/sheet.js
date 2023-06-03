const express = require('express');
const logger = require('../utils/logger');
const { trigger } = require('../utils/sheettrigger');
const router = express.Router();
const HttpStatus = require('http-status-codes');

router.post('/send', async (req, res) => {
    let { name, email, comment, cheatSheetId } = req.body;
    logger.debug('sending cheatsheet to user: '+ name);
    try {
        const response = await trigger({ name, email, comment, cheatSheetId });
        res.status(HttpStatus.OK).json(response);
    } catch (err) {
        logger.error('failed to send data to sheet trigger');
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errors: err.response });
    }
});

module.exports = router;