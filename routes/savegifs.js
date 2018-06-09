const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
/*
/trending

Retrieve trending Gifs grouped by created year (import_datetime), such as each Gif object contains the following:

ID
Url
Name
Description
*/

/* GET users listing. */
const fetchLatest = async (ids) => {
  
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

// [id1, id2, id3]


router.post('/', async (req, res, next) => {
  const ids = req.body;
  
  const body = {
    'l41m6YZzaqxZQp4IM': {
      "id": "l41m6YZzaqxZQp4IM",
            "url": "https://giphy.com/gifs/ocean-dolphin-swim-l41m6YZzaqxZQp4IM",
            "name(slug)": "ocean-dolphin-swim-l41m6YZzaqxZQp4IM",
            "description": "uc santa cruz swimming GIF by University of California"
    },
    "Sq6i5vJBUPM0U":
        {
            "id": "Sq6i5vJBUPM0U",
            "url": "https://giphy.com/gifs/tvland-tribute-joan-rivers-howd-you-get-so-rich-Sq6i5vJBUPM0U",
            "name(slug)": "tvland-tribute-joan-rivers-howd-you-get-so-rich-Sq6i5vJBUPM0U",
            "description": "joan rivers comedy GIF by TV Land Classic"
        },
    "Rse8lCnT2SNJ6":
        {
            "id": "Rse8lCnT2SNJ6",
            "url": "https://giphy.com/gifs/nfl-august-chick-Rse8lCnT2SNJ6",
            "name(slug)": "nfl-august-chick-Rse8lCnT2SNJ6",
            "description": "rich damon wayans GIF"
        },
      "h7N7tjrgPpRiE":
        {
            "id": "h7N7tjrgPpRiE",
            "url": "https://giphy.com/gifs/buzzfeed-cheap-tobago-h7N7tjrgPpRiE",
            "name(slug)": "buzzfeed-cheap-tobago-h7N7tjrgPpRiE",
            "description": "best friends GIF"
        }
      }
    
     
    fs.writeFile("./test.txt", JSON.stringify(body), function(err) {
      if(err) {
        return res.status(500).json({error: 'unable to save'});
      }
      res.status(201).json({data: 'success'})
 
    }) 
  
});

module.exports = router;
