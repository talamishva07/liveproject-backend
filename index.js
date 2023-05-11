const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

require('./db/connection');
app.use('/public/', express.static('public'));


app.listen(7812, () => {
    console.log("i am server....");

});
app.use('/api', require('./api/blogapi'));
app.use('/', (req, res) => {
    return res.send("backend start")
})
