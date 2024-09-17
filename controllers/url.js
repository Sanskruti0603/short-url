const shortid = require('shortid');
const URL = require("../models/url");
const {restrictToLoggedinUserOnly}=require("../middleware/auth");
 

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
   console.log('body:', body);
    if (!body.url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    const shortID = shortid.generate(); // Generate short ID with shortid

    try {
        console.log("req.id:",req.user);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id
        });
        // console.log('URL created:', newUrl);
        return res.render("home", { id: shortID });
    } catch (error) {
        console.error('Error creating URL:', error);
        return res.status(500).json({ error: 'Failed to generate URL' });
    }
}

async function handleGetanalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: "URL not found" });
        }
        return res.json({ totalclicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
}

module.exports = { handleGenerateNewUrl, handleGetanalytics };
