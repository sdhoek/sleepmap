
var cors = require('cors')
var app = require('express')();
var request = require('request-promise');
var querystring = require('querystring');

app.use(cors({credentials: true, origin: true}))
app.use('/direction-proxy', (req, res) => {
  request.get('https://maps.googleapis.com/maps/api/directions/json?' + querystring.stringify(req.query)).then(result => {
    console.log(result);
    res.send(result);
  })
});
console.log('Listening on ' + 3000)
app.listen(3000);
