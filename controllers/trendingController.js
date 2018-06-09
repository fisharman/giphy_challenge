const axios = require('axios');
/*
/trending

Retrieve trending Gifs grouped by created year (import_datetime), such as each Gif object contains the following:

ID
Url
Name
Description
*/

const fetchLatest = async () => {

  let res;
  try {
    res = await axios.get('http://api.giphy.com/v1/gifs/trending', {
      headers: {
        api_key: 'LEls10pQ1lqL1lxLehiPoD0P61SpGcQK'
      }
    });
  } catch (err) {
    throw new Error('giphy API error');
  }

  const output = new Map();
  // if promise was rejected above. node will complain about "UnhandledPromiseRejectionWarning"
  // for .forEach below even though it will never reach there
  res.data['data'].forEach(gif => {
    const year = gif['import_datetime'].substring(0, 4);
    if (!output[year]) {
      output[year] = [];
    }
    output[year].push(gif);
  })
 
  return output;
}

const index = async (req, res, next) => {
  const out = await fetchLatest().catch(err => 
    res.status(500).json({error: err.message})
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
      processedOut[key].push(currentGif);
    })
  });
  
  res.status(200).json(processedOut);
};

module.exports = { index };