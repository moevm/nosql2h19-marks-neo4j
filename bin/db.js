var fs = require("fs");
var rq = require("./requests");

//А сдесь у нас функции для обращения к Болту (но не взаимодействие...
//  чаще всего)
// Прослойка между сервером и 
class Data{
	//Для каждого запроса создаётся doЗапрос и иногда (в случае использования в запросе id(), count()...) parseЗапрос
	
	
	doTest(res, params, end){
		rq.test(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
////////////
//Страница 2
	// Набор "Факультет-Направление-Группа-Студент"
	do2(res, params, end){
			rq._2(
			res,
			(res, result)=>{end(res, this.parse2(result));},
			params
		);
	}
	parse2(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1],
					result.records[i]._fields[2],
					result.records[i]._fields[3],
					result.records[i]._fields[4],
					result.records[i]._fields[5].low,
				]
			);
		}
		return ret;
	}
	//Запрос "добавление студента"
	doAddStudent(res, params, end){
		rq.addStudent(
			res,
			end,
			params
		);
	}
	//Запрос "удаление студента"
	doDelStudent(res, params, end){
		rq.delStudent(
			res,
			end,
			params
		);
	}
	//Запросы для фильтров
	doGetFilter(res, params, end){
		rq.getFilter(
			res,
			(res, result)=>{end(res, this.parse2(result));},
			params
		);
	}
	doGetFacultet(res, params, end){
		rq.getFacultet(
			res,
			(res, result)=>{end(res, this.parseGetFacultet(result));},
			params
		);
	}
	parseGetFacultet(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					result.records[i]._fields[2].low
				]
			);
		}
		return ret;
	}
	doGetNapravlenie(res, params, end){
		rq.getNapravlenie(
			res,
			(res, result)=>{end(res, this.parseGetNapravlenie(result));},
			params
		);
	}
	parseGetNapravlenie(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low
				]
			);
		}
		return ret;
	}
	doGetGroup(res, params, end){
		rq.getGroup(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
////////////
//Страница 3
	// Набор "Кафедра-Препод"
	do3(res, params, end){
		rq._3(
			res,
			(res, result)=>{end(res, this.parse3(result));},
			params
		);
	}
	parse3(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1],
					result.records[i]._fields[2],
					result.records[i]._fields[3].low
				]
			);
		}
		return ret;
	}
	doGetKafedras(res, params, end){
		rq.getKafedras(
			res,
			(res, result)=>{end(res, this.parseGetKafedras(result));},
			params
		);
	}
	parseGetKafedras(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					result.records[i]._fields[2].low
				]
			);
		}
		return ret;
	}
	//Запрос "добавление препода"
	doAddTeacher(res, params, end){
		rq.addTeacher(
			res,
			end,
			params
		);
	}
	//Запрос "удаление препода"
	doDelTeacher(res, params, end){
		rq.delTeacher(
			res,
			end,
			params
		);
	}


////////////
//Страница 5
	// Набор "Факультет-Направление-Группа-Студент"
	do5(res, params, end){
			rq._5(
			res,
			(res, result)=>{end(res, this.parse5(result));},
			params
		);
	}
	parse5(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1],
					result.records[i]._fields[2],
					result.records[i]._fields[3],
					result.records[i]._fields[4],
					result.records[i]._fields[5].low,
				]
			);
		}
		return ret;
	}
	doGetAssessmets(res, params, end){
		rq.getAssessmets(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	//Выставить оценку
	doAddAssesement(res, params, end){
		rq.addAssesement(
			res,
			end,
			params
		);
	}
	//Убрать оценку
	doDellAssesement(res, params, end){
		rq.dellAssesement(
			res,
			end,
			params
		);
	}
	doGetLessAndTeach(res, params, end){
		rq.getLessAndTeach(
			res,
			(res, result)=>{end(res, this.parseGetLessAndTeach(result));},
			params
		);
	}
	parseGetLessAndTeach(result){
		let ret = [];
		if (result.records[0]._fields[0]==null){
			return ret;
		}
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					`${result.records[i]._fields[2]} ${result.records[i]._fields[3]}`
				]
			);
		}
		return ret;
	}


////////////
//Страница 6
	////Ср. оценка на факультете за период
	doAvgAssessmentPerFacultetFromDate(res, params, end){
		rq.avgAssessmentPerFacultetFromDate(
			res,
			(res, result)=>{end(res, this.parseAvgAssessmentPerFacultetFromDate(result));},
			params
		);
	}
	parseAvgAssessmentPerFacultetFromDate(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0].low,
					result.records[i]._fields[1]
				]
			);
		}
		return ret;
	}


/////////////
//Страница 7
	// Набор "Препод-Предметы"
	do7(res, params, end){
			rq._7(
			res,
			(res, result)=>{end(res, this.parse7(result));},
			params
		);
	}
	parse7(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				 [
					 result.records[i]._fields[0],
					 result.records[i]._fields[1],
					 result.records[i]._fields[2],
					 result.records[i]._fields[3].low,
				 ]
			);
		}
		return ret;
	}
	doGetLessons(res, params, end){
		rq.getLessons(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	doGetAnotherLessons(res, params, end){
		rq.getAnotherLessons(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	doAddLessonToTeacher(res, params, end){
		rq.addLessonToTeacher(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	doDellLessonToTeacher(res, params, end){
		rq.dellLessonToTeacher(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}


////////////
//Страница 8
	doGetTeachAndLess(res, params, end){
		rq.getTeachAndLess(
			res,
			(res, result)=>{end(res, this.parseGetTeachAndLess(result));},
			params
		);
	}
	parseGetTeachAndLess(result){
		let ret = [];
		if (result.records[0]._fields[0]==null){
			return ret;
		}
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					`${result.records[i]._fields[2]} ${result.records[i]._fields[3]}`
				]
			);
		}
		return ret;
	}
	doCountAssesementByTeacherOnLesson(res, params, end){
		rq.countAssesementByTeacherOnLesson(
			res,
			(res, result)=>{end(res, this.parseCountAssesementByTeacherOnLesson(result));},
			params
		);
	}
	parseCountAssesementByTeacherOnLesson(result){
		let ret = [];
		if (result.records[0]._fields[0]==null){
			return ret;
		}
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low
				]
			);
		}
		return ret;
	}
	
	
////////////
//Страница 9
	doWorkloadOnKafedra(res, params, end){
		rq.workloadOnKafedra(
			res,
			(res, result)=>{end(res, this.parseWorkloadOnKafedra(result));},
			params
		);
	}
	parseWorkloadOnKafedra(result){
		let ret = [];
		if (result.records[0]._fields[0]==null){
			return ret;
		}
		for (let i in result.records){
			ret.push(
				[
					`${result.records[i]._fields[0]} ${result.records[i]._fields[1]}`,
					result.records[i]._fields[2].low,
					
				]
			);
		}
		return ret;
	}
	
	
	
///////////////////
//Страница Facultet
	doGetFacultetByID(res, params, end){
		rq.getFacultetByID(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	doGetNapravleniaByFac(res, params, end){
		rq.getNapravleniaByFac(
			res,
			(res, result)=>{end(res, this.parseGetNapravleniaByFac(result));},
			params
		);
	}
	parseGetNapravleniaByFac(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1],
					result.records[i]._fields[2].low,
					result.records[i]._fields[3].low
				]
			);
		}
		return ret;
	}
	doAddNapravlenie(res, params, end){
		rq.addNapravlenie(
			res,
			end,
			params
		);
	}
	doDellNapravlenie(res, params, end){
		rq.dellNapravlenie(
			res,
			end,
			params
		);
	}
	
	
//////////////////
//Страница Kafedra
	doGetKafedraByID(res, params, end){
		rq.getKafedraByID(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	doGetLessonsByKaf(res, params, end){
		rq.getLessonsByKaf(
			res,
			(res, result)=>{end(res, this.parseGetLessonByKaf(result));},
			params
		);
	}
	parseGetLessonByKaf(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					result.records[i]._fields[2].low
				]
			);
		}
		return ret;
	}
	doAddLesson(res, params, end){
		rq.addLesson(
			res,
			end,
			params
		);
	}
	doDellLesson(res, params, end){
		rq.dellLesson(
			res,
			end,
			params
		);
	}
	
	
//////////////////////
//Страница Napravlenie	
	doGetNapravlenieByID(res, params, end){
		rq.getNapravlenieByID(
			res,
			(res, result)=>{end(res, this.parseGetNapravlenieByID(result));},
			params
		);
	}
	parseGetNapravlenieByID(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				 [
					 result.records[i]._fields[0],
					 result.records[i]._fields[1].low,
				 ]
			);
		}
		return ret;
	}
	doGetGroupByNapr(res, params, end){
		rq.getGroupByNapr(
			res,
			(res, result)=>{end(res, this.parseGetGroupByNapr(result));},
			params
		);
	}
	parseGetGroupByNapr(result){
		let ret = [];
		
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low,
					result.records[i]._fields[2].low
				]
			);
		}
		return ret;
	}
	//Запрос "добавление группы"
	doAddGroup(res, params, end){
		rq.addGroup(
			res,
			end,
			params
		);
	}
	doDellGroup(res, params, end){
		rq.dellGroup(
			res,
			end,
			params
		);
	}
	
	
	
	//Классический переводчик "ответ neo4j -> json"
	parseClassic(result){
		let ret = [];
		for (let i in result.records)
			ret.push(result.records[i]._fields);
		return ret;
	}



	// Пример распарсивания запроса MATCH (n) return n.name, id(n):
	/*
	parseQQQ(result){
		let ret = [];
		for (let i in result.records){
			// Разница только в аргументе для ret.push
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low //Для всяких id(), cost(), avg()... в запросе
				]
			);
		}
	}
	*/

	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	////////////Без спец знаний и умений - не лезть!!!//////////
	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	
	//"А ну быстро взял присланый файл и перекрасил Базу в него"
	doImport(res){
		//Делаем бэкап
		this.doExport(res, (res)=>{
			let exportJSON = readExportFiles();
			
			let date = new Date();
			let name = `${date.getFullYear()}y_${date.getMonth()}m_${date.getDate()}d_${date.getHours()}h_${date.getMinutes()}m_${date.getSeconds()}s`
			fs.writeFile(`./data/backups/${name}.json`, JSON.stringify(exportJSON), (err) => {
				if(err) throw err;
			});
			
			//затем очищаем базу
			rq.cleanDB(res, (res)=>{
				//импортируем из файла
				rq.doImport(res,(res)=>{
					//очищаем "левые" идишники
					rq.remCrutchID(res,(res)=>{res.sendFile("Upload.html", {root: "public/html"});})})}
				);
			}
		);
	}
	
	//Штука для создания бекапа данных (и дальнейшего посыла клиенту по-умолчанию)
	_doExport(res, func = this.sendExportFile){
		let flag = [0];
		rq.backupNodes(res, (re)=>{this.createExportFile(flag, re, func)});
		rq.backupRelSh(res, (re)=>{this.createExportFile(flag, re, func)});
	}
	

	
	//Создаём бэк-ап файл
	createExportFile(flag, res, nextStep=this.sendExportFile){
		flag[0]++;
		if (flag[0]!=11) return;
		////////////////////////
		///////////////////////
		
		nextStep(res);
	}

	//Отправляем клиенту
	sendExportFile(res){
		
		//Код, отвечающий за запись в файлы
		let exportJSON = readExportFiles();
		
		
		fs.writeFileSync("./data/export.json", JSON.stringify(exportJSON), (err) => {
			if(err) throw err;
		});
		
		
		let date = new Date();
		let name = `${date.getFullYear()}y_${date.getMonth()}m_${date.getDate()}d_${date.getHours()}h_${date.getMinutes()}m_${date.getSeconds()}s`
		fs.writeFile(`./data/backups/${name}.json`, JSON.stringify(exportJSON), (err) => {
			if(err) throw err;
		});


		let file = `${__dirname}/../data/export.json`;
		res.download(file);
	}
	
	
	constructor(){
		this.doExport = this._doExport0;
	}
	
	_doExport0(res, func = this.sendExportFile){
		let flag = [0];
		rq.getLabels       (res, (re,result)=>{this.getLabelsParser       (flag, re, result, func)});
		rq.getRelationships(res, (re,result)=>{this.getRelationshipsParser(flag, re, result, func)});
	}
	
	getLabelsParser(flag, res, result, end){
		let nodes = [];
		
		for (let i in result.records){
			if (result.records[i]._fields[0].length == 1)
				nodes.push(
						result.records[i]._fields[0][0]
				);
			else
				nodes.push(
						result.records[i]._fields[0][1]
				);
		}
		flag.nodes = nodes;
		this._endFirstExport(flag,res,end);
	}
	
	getRelationshipsParser(flag, res, result, end){
		let relationships = [];
		
		for (let i in result.records){
				relationships.push(
						result.records[i]._fields[0]
				);
		}
		flag.relationships = relationships;
		this._endFirstExport(flag,res,end);
	}
	
	_endFirstExport(flag, res, func=this.sendExportFile){
		flag[0]++;
		if (flag[0]!=2) return;
		////////////////////////
		///////////////////////
		let labels = [];
		for(let i in flag.nodes)
			labels.push(flag.nodes[i]);
		let kolNodes = flag.nodes.length;
		for(let i in flag.relationships)
			labels.push(flag.relationships[i]);
		let kolRels = flag.relationships.length;
		
		rq.labels = labels;
		rq.kolNodes = kolNodes;
		rq.kolRels = kolRels;
		
		this.doExport = this._doExport;
		this.doExport(res, func);
	}
};

//Собираем JSON из экспортированных файлов
function readExportFiles(){
	let exportJSON = {nodes: {}, relationship:{}};
	
	for(let i=0;i<rq.kolNodes;i++)
		exportJSON.nodes       [rq.labels[i]] = JSON.parse(fs.readFileSync(`./data/export/${rq.labels[i]}.json`)).list;
	for(let i=rq.kolNodes;i<rq.kolNodes+rq.kolRels;i++)
		exportJSON.relationship[rq.labels[i]] = JSON.parse(fs.readFileSync(`./data/export/${rq.labels[i]}.json`)).list;
	return exportJSON;
}

module.exports = new Data();
