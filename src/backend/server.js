const express = require('express')
const fetch = require('cross-fetch')
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/get-details', (req, res) => {
    const URL = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${req.body.pageNumber}`

    console.log('consle.req = ', req.body);
    callApi()
    async function callApi(){
        let response = await fetch(URL,{
            method: "GET",
            "mode": 'cors',
            "headers":{
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                }
            }).then(resp=>resp.json())
            .then(data=>{
                return data;
            })
            .catch(error=>{
                console.error("API Error : ",JSON.stringify(error));
                return error;
            });
            res.send(response)
            return response;
    }
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})