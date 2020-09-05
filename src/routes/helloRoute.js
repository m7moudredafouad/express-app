const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.status(200).json({
            success: true,
            message: "App is running Yaaaaye 🔥",
            url: req.originalUrl,
            path: req.route.path,
            host: req.hostname,
            fresh: req.fresh,
            method: req.method,
            protocol: req.protocol,
            secure: req.secure,
            ip: req.ip,
            ips: req.ips,

        })
    })

module.exports = router;