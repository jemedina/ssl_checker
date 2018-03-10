var express = require('express');
var app = express();
const { exec } = require('child_process');

var bodyParser = require('body-parser');
var multer = require('multer'); 

/*Config uploader*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ dest: './uploads', storage: storage });


/*Verify Methods*/
function verifyCert (filename, res) {
	var cmd = `openssl x509 -in uploads/${filename} -text -noout`;
	exec(cmd, (err, stdout, stderr) => {
	  res.send(stdout);
	  console.log(cmd);
	});	
}

function verifyKey (filename, pass, res) {
	var cmd = `openssl rsa -in uploads/${filename} -check -noout -passin pass:${pass}`;
	exec(cmd, (err, stdout, stderr) => {
	  res.send(stdout);
	  console.log(cmd);
	});	
}

/* App Routes */
app.use(express.static('static'));

app.post('/verifyCert', upload.single('cert'), function (req, res) {
	verifyCert(req.file.filename, res);
});


app.post('/verifyKey', upload.single('key'), function (req, res) {
	verifyKey(req.file.filename, req.body.pass, res);
});

app.listen(3000, function () {
  console.log('App listening on port 3000');
});
