const express = require('express');
const axios = require('axios');
const fs = require('fs');

// post { "ids": ["l41m6YZzaqxZQp4IM", "Sq6i5vJBUPM0U", "Rse8lCnT2SNJ6", "h7N7tjrgPpRiE"] }

const fetchGIFs = async (ids) => {
    ids = ids.toString();
    let res;
    try {
        res = await axios.get('http://api.giphy.com/v1/gifs', {
            headers: {
                api_key: 'LEls10pQ1lqL1lxLehiPoD0P61SpGcQK',
            },
            params: {
                ids: ids
            }
        });
    } catch (err) {
        throw new Error('giphy API error');
    }
    
    let processedOut = [];
    res.data.data.forEach(gif => {
        let currentGif = {};
        currentGif['id'] = gif['id'];
        currentGif['url'] = gif['url'];
        currentGif['name(slug)'] = gif['slug'];
        currentGif['description'] = gif['title'];
        processedOut.push(currentGif);
    });
    return processedOut;
}

const index = async (req, res, next) => {
    const out = await fetchGIFs(req.body.ids).catch(err => {
        console.log('error');
        return res.status(500).json({error: err.message})
    }
        
    );
    fs.writeFile("./savedGIFs.txt", JSON.stringify(out), function (err) {
        if (err) {
            return res.status(500).json({ error: 'unable to save' });
        }
    })
    res.status(201).json({ data: "save success" });
};

module.exports = { index };