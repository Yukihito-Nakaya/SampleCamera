const express = require('express');
const app = express();
const port = 3000;
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/timezone'))
dayjs.extend(require('dayjs/plugin/utc'))
dayjs.tz.setDefault('Asia/Tokyo')

const path = require('path');
app.use(express.static('public'));


const API_TOKEN = "***PUT_YOUR_TOKEN***";
const API_URL = "***PUT_YOUR_TOKEN_PATH***";

const ExpressformData = require('express-form-data');

const fetch = require('node-fetch');

const FormData = require('form-data');
const fs = require('fs');

app.use(ExpressformData.parse({ autoClean:true}));

app.get('/', (req, res) => res.render('Sample_Camera.ejs'));

app.post('/lpr-api', async (req, res) => {
    const path1 = req.files.file1.path;
    if (path1) {
        const form = new FormData();
        const buffer = fs.createReadStream(path1);
        const parameter = fs.createReadStream('./public/json/param.json');

        form.append('image1',buffer);
        form.append('meta',parameter);

        if (API_TOKEN == "***PUT_YOUR_TOKEN***"){
            await res.send(["トークンを設定してください"]);
        }else {
            url = `${API_URL}?token=${API_TOKEN}`
    
            const response = await fetch(url, { method:'PUT', body: form});
            
            const json = await response.json();
    
            const request_time = await dayjs.tz().format('YYYY-MM-DD HH:mm:ss');
            
            await res.send([json,request_time]);
        }

    } else {
        res.render('/', {message: "エラー：アップロードできませんでした。"});
    }
});

app.listen(port, () => console.log(`SensingAPI LPR_API Sample app listening on port ${port}!`));