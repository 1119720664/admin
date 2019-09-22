const express=require('express')
const app = express()
const router = express.Router()
app.use('/',express.static('./dist'))

const port = process.env.PORT || 1500
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})