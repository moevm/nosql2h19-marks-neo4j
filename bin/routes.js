const express = require("express");
const multer  = require("multer");
var   fs      = require("fs");

const router  = express.Router();


router.use("/public", express.static('public'));


{//Начало дороги на экспорт/импорт
	const db     = require("./db");
	const upload = multer({dest:"data"});
	
	//"Пожалуйста, снеси базу к чертям и установи вот это"
	router.post("/upload", upload.single("filedata"), function (req, res, next) {
		let filedata = req.file;
		
		if(!filedata)
			res.send("Ошибка при загрузке файла");
		else
			fs.rename(`./data/${filedata.filename}`, './data/import.json', function(err) {
				if ( err ) 
					console.log('ERROR: ' + err);
				else
					db.doImport(res);
		});
	});
	
	
	//"Э, Слышь! Бэкап есть? А если найду?"
	router.post("/download", (req,res)=>{
		db.doExport(res);
	});
}


{//Отдать Болту присланный юзверем файл на растерзание
	//Отправлет файл import.json
	router.get("/import", (req,res)=>{
		fs.readFile('./data/test.json', function(error, data){   
			if(error){
				res.statusCode = 404;
				res.end("Resourse not found!");
			}   
			else{
				res.end(data);
			}
		});
	});
}


{//Базовая адресация:
	//Открытие начальной страницы
	router.get("/", (req, res) => {
		res.sendFile("main.html", {root: "public/html"});
		//res.render('main');
	});
	

	//Открытие стрицы а-ля ":3000/`page`"
	router.get("/:name", (req, res) => {
		fs.access(__dirname+`/../public/html/${req.params.name}.html`, (error)=>{
		if (error) {
			res.status(404);
			res.end("Resourse not found!");
		} else {
			res.sendFile(req.params.name+".html", {root: "public/html"});
		}});
	});
	//Открытие стрицы а-ля ":3000/`path`/`page`"
	router.get("/:path/:name", (req, res) => {
		fs.access(__dirname+`/../public/html/${req.params.path}/${req.params.name}.html`, (error)=>{
		if (error) {
			res.status(404);
			res.end("Resourse not found!");
		} else {
			res.sendFile(`/${req.params.path}/${req.params.name}.html`, {root: "public/html"});
		}});
	});
}

//Пока-что у нас всего 1 способ отправить запрос на БД: скомпоновать на клиенте
// а затем - через сервер к БД
// Чуть позже (когда определимся со всеми запросами) будем отправлять только необходимые параметры,
// а создаваться запрос будет на сервере
router.put("/ajax", (req,res)=>{
	//console.log(req.body.req);	
	const neo4j = require('neo4j-driver').v1;

	const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
	const session = driver.session();

	const resultPromise = session.run(
	  req.body.req
	);

 	resultPromise.then(result => {
	  session.close();
	  
	  res.json(result);

	  // on application exit:
	  driver.close();
	});
	
	res.status(200);
});



module.exports = router;
