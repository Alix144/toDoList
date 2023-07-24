import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

let arrayItem = [];
let arrayItemWork = [];
let formattedDate;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function tdDate(res, req, next){
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    formattedDate = `${monthNames[month]} ${day}, ${year}`;
    next();
}

app.use(tdDate);

app.get("/", (req, res) => {
    res.render("today.ejs", { dateToday: formattedDate, ArrayItem: arrayItem })
})

app.get("/work", (req, res) => {
    res.render("work.ejs", { ArrayItemWork: arrayItemWork })
})

app.get("*", (req, res) => {
    res.render("404.ejs")
})

app.post("/", (req, res) => {
    res.render("today.ejs", { newListItem: req.body["newItem"],
                              dateToday: formattedDate,
                              ArrayItem: arrayItem })
})

app.post("/work", (req, res) => {
    res.render("work.ejs", { newListItemWork: req.body["newItemWork"],
                             ArrayItemWork: arrayItemWork })
})

app.listen(port, ()=>{
    console.log("live on port: " + port);
})