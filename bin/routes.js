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
	router.post("/getKafedras", (req, res)=>{
		db.doGetKafedras(res, req.body, classicEnd);
	});
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
	//Выставить отметку студенту
	router.post("/addAssesement", (req, res) =>{
		db.doAddAssesement(res, req.body, classicEnd);
	});
	//Убрать отметку студенту
	router.post("/dellAssesement", (req, res) =>{
		db.doDellAssesement(res, req.body, classicEnd);
	});
	//Список предметов, которые ещё не проставлены и кто может проставить
	router.post("/getLessAndTeach", (req, res) =>{
		db.doGetLessAndTeach(res, req.body, classicEnd);
	});

	
////////////
//Страница 6
	//Ср. оценка на факультете за период
	router.post("/avgAssessmentPerFacultetFromDate", (req, res)=>{
		db.doAvgAssessmentPerFacultetFromDate(res, req.body, classicEnd);
	});
	
	
/////////////
//Страница 7
	//Запрос на получение предметов, которые ведёт препод
	router.post("/getLessons", (req, res) =>{
		db.doGetLessons(res, req.body, classicEnd);
	});
	//Запрос на получение предметов, которые может вести препод
	router.post("/getAnotherLessons", (req, res) =>{
		db.doGetAnotherLessons(res, req.body, classicEnd);
	});
	//Нагрузить препода
	router.post("/addLessonToTeacher", (req, res) =>{
		db.doAddLessonToTeacher(res, req.body, classicEnd);
	});
	//Разгрузить препода
	router.post("/dellLessonToTeacher", (req, res) =>{
		db.doDellLessonToTeacher(res, req.body, classicEnd);
	});


////////////
//Страница 8
	//Список предметов и преподавателей
	router.post("/getTeachAndLess", (req, res) =>{
		db.doGetTeachAndLess(res, req.body, classicEnd);
	});
	router.post("/countAssesementByTeacherOnLesson", (req, res) =>{
		console.log(req.body)
		db.doCountAssesementByTeacherOnLesson(res, req.body, classicEnd);
	});
	
	
////////////
//Страница 9
	//Список предметов, которые ещё не проставлены и кто может проставить
	router.post("/workloadOnKafedra", (req, res) =>{
		db.doWorkloadOnKafedra(res, req.body, classicEnd);
	});	
	
	
///////////////////
//Страница Facultet
	router.post("/getNapravleniaByFac", (req,res)=>{
		db.doGetNapravleniaByFac(res,req.body, classicEnd);
	});
	//Добавление направления
	router.post("/addNapravlenie", (req,res)=>{
		db.doAddNapravlenie(res, req.body, classicEnd)
	});
	//Удаление направления
	router.post("/dellNapravlenie", (req,res)=>{
		db.doDellNapravlenie(res, req.body, classicEnd)
	});
	
	
//////////////////
//Страница Kafedra	
	router.post("/getLessonsByKaf", (req,res)=>{
		db.doGetLessonsByKaf(res,req.body, classicEnd);
	});
	//Добавление предмета   (+ Страница Kafedra)
	router.post("/addLesson", (req,res)=>{
		db.doAddLesson(res,req.body, classicEnd);
	});
	router.post("/dellLesson", (req,res)=>{
		db.doDellLesson(res, req.body, classicEnd)
	});
	
	
//////////////////////
//Страница Napravlenie
	router.post("/getGroupByNapr", (req, res)=>{
		db.doGetGroupByNapr(res, req.body, classicEnd);
	});
	router.post("/addGroup2", (req,res)=>{
		db.doAddGroup(res, req.body, (res, answer)=>{
			db.doGetGroupByNapr(res, req.body, classicEnd);
		})
	});
	router.post("/dellGroup", (req,res)=>{
		db.doDellGroup(res, req.body, (res, answer)=>{
			db.doGetGroupByNapr(res, req.body, classicEnd);
		})
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
	
	router.get("/7/:id", (req, res) => {
		db.do7(res, {id: req.params.id}, (res, ans)=>{res.render("7", {std: ans[0]});});
	});
	
	router.get("/9", (req, res) => {
		db.doGetKafedras(res, req.body, (res, ans)=>{res.render("9", {kafedras: ans});});
	});
	router.get("/facultets", (req, res) => {
		db.doGetFacultet(res, req.body, (res, ans)=>{res.render("Facultets", {facultets: ans});});
	});
	router.get("/facultet/:id", (req, res) => {
		db.doGetFacultetByID(res, {id: req.params.id}, (res, ans)=>{res.render("Facultet", {facultet: ans, id:req.params.id});});
	});
	router.get("/napravlenie/:id", (req, res) => {
		db.doGetNapravlenieByID(res, {id: req.params.id}, (res, ans)=>{res.render("Napravlenie", {napravlenie: ans, id:req.params.id});});
	});
	
	router.get("/kafedras", (req, res) => {
		db.doGetKafedras(res, req.body, (res, ans)=>{res.render("Kafedras", {kafedras: ans});});
	});
	router.get("/kafedra/:id", (req, res) => {
		db.doGetKafedraByID(res, {id: req.params.id}, (res, ans)=>{res.render("Kafedra", {kafedra: ans, id:req.params.id});});
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
