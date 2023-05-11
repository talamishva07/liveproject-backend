const express = require('express');
const app = express();
const fs = require('fs');
const { promisify } = require('util');

const router = express.Router();

const multer = require("multer");
const unlinkAsync = promisify(fs.unlink)
const Blog = require('../model/blogschema');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});


app.use(express.json());
router.post('/createblog', upload.single("image"), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        console.log(data);

        const dataAdd = Blog.create({
            filepath: req.file.originalname,
            titel: data.titel,
            type: data.type,
            Description: data.Description,
        })
        if (dataAdd != undefined) {
            res.send({ responce: "sended" });
        } else {
            res.send({ responce: 0 });
        }
    } catch (error) {
        res.send({ err: error })
        console.log('error:::', error);

    }

})


router.get('/getAll', async (req, res) => {
    try {
        const dataAdd = await Blog.find({});
        return res.send({ dataAdd });

    } catch (error) {
        console.log('error:::', error);
        return res.send({ err: error })

    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const getBlogData = await Blog.findById(req.params.id)
        const path = `./public/${getBlogData.filepath}`
        const dgv = await unlinkAsync(path)
        const removeblog = await Blog.findByIdAndRemove(req.params.id);
        return res.send({ message: "the  blog is remove" })

    } catch (error) {
        console.log('error:::', error);
        return res.send({ err: error })

    }
})

router.post('/getBlog', async (req, res) => {
    try {
        const getData = await Blog.findById(req.body.id);
        console.log(getData);
        return res.send({ getdata });
    } catch (error) {

    }
})





module.exports = router;