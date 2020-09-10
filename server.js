var express = require('express')
var mongoose = require('mongoose')
var shorturl = require('./models/shortUrl');
const { urlencoded } = require('express');
const loginschema = require('./models/login');
app = express()


mongoose.connect("mongodb://192.168.4.63:27017/ud");

app.set("view engine", "ejs")
app.use(urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))


app.get("/", async function (req, res) {
    res.render("login")
})

app.get("/forgot", async function (req, res) {
    res.render("forgotpage")
})

app.get("/dashboard", async function (req, res) {

    const shortUrls = await shorturl.find()
    res.render("dashboard", { shortUrls: shortUrls })
})

app.get("/newaccount", async function (req, res) {

    res.render("createaccount")
})

app.get("/:shortUrl", async (req, res) => {

    const shortUrl = await shorturl.findOne({ short: req.params.shortUrl })
    if (shorturl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)

})

app.post("/forgot", async function (req, res) {
    const forgotuser = await loginschema.find({ email: req.body.email })
    var password = forgotuser[0].password
    if (forgotuser != null) {

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'user@gmail.com',
                pass: 'userpassword'
            }
        });
        transporter.sendMail({
            from: 'abc@gmail.com',
            to: 'cde@gmail.com',
            subject: 'Forgot Password',
            text: password
        });
        res.send("SUPER!!  Successfully Password send your Email verify and login again")
    }
    else {
        res.send("Invalid mailId")
    }
})


app.post("/", async function (req, res) {
    const logeduser = await loginschema.findOne({ username: req.body.uname, password: req.body.psw })

    if (logeduser != null) {
        res.redirect(`/dashboard`)
    }
    else {
        res.send('USername or Password incorrect');
    }
})

app.post("/newaccount", async function (req, res) {

    await loginschema.create({ username: req.body.uname, password: req.body.psw, email: req.body.email })
    res.redirect("/")
})


app.post("/shortUrls", async function (req, res) {

    await shorturl.create({ full: req.body.fullurlinput })
    res.redirect('/:shortUrl')
})

app.listen(process.env.port || 5000)