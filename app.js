import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const formattedDate = `${monthNames[month]} ${day}, ${year}`;

    res.render("today.ejs", { dateToday: formattedDate })
})

app.get("/work", (req, res) => {
    res.render("work.ejs")
})

app.get("*", (req, res) => {
    res.render("404.ejs")
})

app.listen(port, ()=>{
    console.log("live on port: " + port);
})