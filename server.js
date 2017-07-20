var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

var googleCheckToken = require('./googleToken');
console.log(googleCheckToken('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2MmU4MDczYjQzMTk1ZDNkMTAzMmJlODdmMTNmNGM4OTE0NTUwY2YifQ.eyJhenAiOiIxMDU2Mjc1NzQ3MjQ1LTR1bnBrNjgxZmZkM3Vwa2J2Zm5ydjQzamFlY3JnbHFpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA1NjI3NTc0NzI0NS00dW5wazY4MWZmZDN1cGtidmZucnY0M2phZWNyZ2xxaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjcwNDI0NjM3MDcwMzY0MTMxOCIsImhkIjoicGNjcGwuYWMudGgiLCJlbWFpbCI6InBvb21wYXRoYWkuY2hhQHBjY3BsLmFjLnRoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJDRmU1ai13WEV2Vk9wbUM3LVoxU3RBIiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTUwMDQ1NTMyNiwiZXhwIjoxNTAwNDU4OTI2LCJuYW1lIjoiUG9vbXBhdGhhaSBQY2NQbCIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLVRJcThkZDg5bEdVL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FJNnlHWHhPRWhjbFBmdTNjYnAyZGZCQUQ1Y05iekk3MEEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlBvb21wYXRoYWkiLCJmYW1pbHlfbmFtZSI6IlBjY1BsIiwibG9jYWxlIjoidGgifQ.bJSbebtwa4Kmp3Arudznq6qzbHM0lJIRg0OcJ97OuQJ3NePEiwWZ0f7AXqPI6GUVfOXB0zIWMlSg_o0aCvUuE5XXm1B-pP5WE5KIW-Tgkg7waH8kprbEdJjRthhSetwyWntjhbp6coO5ABTymd55hHeX8G4gvMrT23-iOCBTUL_pFYcN6WUkcyYwFJy7B7X-3ZxvSmSX1hXCNPHQHx2EI2myAZ9XHWmadQxpYMUDmXyH7v-7T9GFwg-gBL_LjGCK9Xf5l-kK_lxIdiZCOQho3nMbOCgst-m0SHoeQQifbcD63LQ8tci7gMujd-MNqCIGt5SHjhzcZqBVcFfE-ht92w'));