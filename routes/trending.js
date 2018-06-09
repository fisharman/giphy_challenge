const express = require('express');
const router = express.Router();
const axios = require('axios');
/*
/trending

Retrieve trending Gifs grouped by created year (import_datetime), such as each Gif object contains the following:

ID
Url
Name
Description
*/

/* GET users listing. */
const fetchLatest = async () => {
  
  const result = await axios.get('http://api.giphy.com/v1/gifs/trending',
    {
      headers: {
        api_key : 'LEls10pQ1lqL1lxLehiPoD0P61SpGcQK'
      }
    })
  .catch(err => console.log(err))
 
  const output = new Map();
  result.data.data.forEach(gif => {
    const year = gif['import_datetime'].substring(0,4);
    if(!output[year]){
      output[year] = [];
    }
    output[year].push(gif);
  })
  return output;
}




router.get('/', async (req, res, next) => {
  const out = await fetchLatest().catch(() =>
    res.status(500).json({error: 'giphy API error'})
  );
  
  const processedOut = new Map();
  Object.keys(out).forEach(key => {
    processedOut[key] = [];
    out[key].forEach(gif => {
      let currentGif = {};
      currentGif['id'] = gif['id'];
      currentGif['url'] = gif['url'];
      currentGif['name(slug)'] = gif['slug'];
      currentGif['description'] = gif['title'];
      console.log(currentGif);
      processedOut[key].push(currentGif);
    })
  });
  
  res.status(200).json(processedOut);
  
});

module.exports = router;

// get /savegif?id=[gifIds, ]