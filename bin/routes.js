const express = require("express");
const router  = express.Router();
var fs = require("fs");

router.use("/public", express.static('public'));


//Базовая адресация:
{
	//Открытие начальной страницы
	router.get("/", (req, res) => {
		res.sendFile("main.html", {root: "public/html"});
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
