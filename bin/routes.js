const express = require("express");
const multer  = require("multer");
var   fs      = require("fs");
const db     = require("./db");
const router  = express.Router();


router.use("/public", express.static('public'));


{//Начало дороги на экспорт/импорт
	
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
		fs.readFile('./data/import.json', function(error, data){   
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




{//Обработчики запросов клиентов
	// Шаблон:
	// router.<type>("/<name>", (req, res) =>{
	// 		db.do<Name>(res, req.body, <func>);
	// });
	
	router.post("/test", (req, res) =>{
		db.doTest(res, req.body, classicEnd);
	});
	
////////////
//Страница 2
	//Зачислить/отчислить студента
	router.post("/addStudent", (req, res) => {
		db.doAddStudent(res, req.body, (res, answer)=>{
			db.do2(res, req.body, classicEnd);
		})
	});
	router.post("/delStudent", (req, res) => {
		db.doDelStudent(res, req.body, (res, answer)=>{
			db.do2(res, req.body, classicEnd);
		})
	});
	//Вызов фильтров
	router.post("/getFilter", (req, res)=>{
		db.doGetFilter(res, req.body, classicEnd);
	});
	router.post("/getFacultet", (req, res)=>{
		db.doGetFacultet(res, req.body, classicEnd);
	});
	router.post("/getNapravlenie", (req, res)=>{
		db.doGetNapravlenie(res, req.body, classicEnd);
	});
	router.post("/getGroup", (req, res)=>{
		db.doGetGroup(res, req.body, classicEnd);
	});
	
	
////////////
//Страница 3
	//Призвать/изгнать препода
	router.post("/addTeacher", (req, res) => {
		db.doAddTeacher(res, req.body, (res, answer)=>{
			db.do3(res, req.body, classicEnd);
		})
	});
	router.post("/delTeacher", (req, res) => {
		db.doDelTeacher(res, req.body, (res, answer)=>{
			db.do3(res, req.body, classicEnd);
		})
	});
	
	
////////////
//Страница 5
	//Запрос на получение оценок студента
	router.post("/getAssessmets", (req, res) =>{
		db.doGetAssessmets(res, req.body, classicEnd);
	});
	
	
////////////
//Страница 6
	//Ср. оценка на факультете за период
	router.post("/avgAssessmentPerFacultetFromDate", (req, res)=>{
		db.doAvgAssessmentPerFacultetFromDate(res, req.body, classicEnd);
	});
	
	
	
	classicEnd = (res,answer)=>{res.json(answer); res.status(200);};
}






{//Базовая адресация:
	//Открытие начальной страницы
	router.get("/", (req, res) => {
		//res.sendFile("main.html", {root: "public/html"});
		res.render('main');
	});
	
	
	//Шаблоны
	////////////////////////////////////////////////////////////////////////////////
	//\\\\\\\ Фиксированный набор адресов (для шаблонов с определёнными параметрами)
	
	// Шаблон:
	// router.get("/<name>", (req, res) =>{
	// 		res.render("<name>", {<json-object>});
	// });
	
	// Пример:
	// router.get("/example", (req, res) =>{
	// 		res.render("example", {name: "Fox", age: 19});
	// });
	
	router.get("/test", (req, res) =>{
		db.doTest(res, req.body, (res, ans)=>{res.render("test",{strs: ans});});
	});
	router.get("/2", (req, res) =>{
		db.do2(res, req.body, (res, ans)=>{res.render("2",{strs: ans});});
	});
	router.get("/3", (req, res) =>{
		db.do3(res, req.body, (res, ans)=>{res.render("3",{strs: ans});});
	});


	router.get("/5/:id", (req, res) => {
		db.do5(res, {id: req.params.id}, (res, ans)=>{res.render("5", {std: ans[0]});});
	});
	
	router.get("/6", (req, res) => {
		db.doGetFacultet(res, {id: req.params.id}, (res, ans)=>{res.render("6", {facultet: ans});});
	});
	//\\\\\\\
	///////////
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	//\\\\\\\ Для всего остального - ищем pug или html страницу с соответствующим названием
	//Открытие стрицы а-ля ":3000/`page`"
	router.get("/:name", (req, res) => {
		//Есть ли такой pug
		fs.access(__dirname+`/../views/${req.params.name}.pug`, (error)=>{
		if (error) {
			//Pug нет, но есть ли такой html-ник
			fs.access(__dirname+`/../public/html/${req.params.name}.html`, (error)=>{
			if (error) {
				res.status(404);
				res.end("Resourse not found!");
			} else {
				res.sendFile(req.params.name+".html", {root: "public/html"});
			}});
		} else {
			res.render(req.params.name);
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


module.exports = router;
