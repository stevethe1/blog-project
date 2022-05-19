
// JavaScript source code
const express = require('express');
const router = express.Router();
const db = require("../database/db_connection.js");
const prevention = require('sqlstring');

router.get('/', (req, res) => {
    db.query('Select * FROM blogs', (err, blogPost) => {
        if (err)
            console.log(err)
        else {
            res.render("home.ejs", { blogPost });
        }
    });

});

router.get('/show/:id', (req, res) => {
    const id = req.params.id;
    db.query("Select * FROM blogs WHERE id=?", [id], (err, blog) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render("show.ejs", { blog });
        }

    });
});

router.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        const post = req.body;  
        db.query("Select * FROM blogs WHERE id=?",[id], (err, blog) => {
 
            if (err) {
                console.log(err)
            }
            else {
                res.render("edit.ejs", { blog });
            }

        });

    
});



router.put("/edit/:id", (req, res) => {
    const post = req.body;
    const id = req.params.id;
    //const sql = "UPDATE blogs SET title= ?,img_url=?, descriptions=? WHERE id=?",[a,b,c];
    db.query("UPDATE blogs SET title= ?,img_url=?,descriptions=? WHERE id=?", [post.title, post.img_url, post.descriptions, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            console.log("update sucessfull");
            res.redirect("/");
        }

    });

});


router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    //const sql = "UPDATE blogs SET title= ?,img_url=?, descriptions=? WHERE id=?",[a,b,c];
    db.query("Delete FROM blogs WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            console.log("blog deleted");
            res.redirect("/");
        }

    });

});


router.get("/create", (req, res) => {
   
            res.render("create.ejs");
   
});

router.post("/create", (req, res) => {
    const post = req.body;
    const data = [[post.title,post.img_url,post.descriptions]]; 
 
    db.query("INSERT INTO blogs(title, img_url, descriptions) VALUES ?",[data] , (err, result) => {
        if (err) {
            console.log(err);
        }
        else {

            console.log(post);
            res.redirect("/");
        }

    });

});

module.exports = router; 