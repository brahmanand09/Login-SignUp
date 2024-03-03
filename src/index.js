const express = require('express');
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb');

const app = express();

const templetePath = path.join(__dirname, "./templetes");

app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.set("views", templetePath);
app.set("view engine", "hbs");

app.get('/', (req, resp) => {
    resp.render("login")
});

app.get('/signup', (req, resp) => {
    resp.render("signup")
});


app.post('/signup', async (req, resp) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data]);

    resp.render("home");

})


app.post('/login', async (req, resp) => {

    try {
        const check = await collection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            resp.render("home");
        }
        else {
            resp.send("Wrong Password!");
        }
    }
    catch {
        resp.send("Wrong details...")
    }
})

const port = 5003;
app.listen(port, ()=>{
  console.log(`Server runing on the port: ${port}`);
})
