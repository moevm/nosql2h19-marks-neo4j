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
		rq.cleanDB(res, (res)=>{
			rq.doImport(res,(res)=>{
				rq.remCrutchID(res)})}
		);
	}
	
	//Штука для создания бекапа данных (и дальнейшего посыла клиенту по-умолчанию)
	doExport(res, func = this.sendExportFile){
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
		
		let exportJSON = {nodes: {}, relationship:{}};
		
		for(let i=0;i<7;i++)
			exportJSON.nodes[rq.labels[i]] = require(`./../data/export/${rq.labels[i]}.json`).list
		for(let i=7;i<11;i++)
			exportJSON.relationship[rq.labels[i]] = require(`./../data/export/${rq.labels[i]}.json`).list
		
		fs.writeFileSync("./data/export.json", JSON.stringify(exportJSON), (err) => {
			if(err) throw err;
		});
		
		nextStep(res);
	}

	//Отправляем клиенту
	sendExportFile(res){
		let file = `${__dirname}/../data/export.json`;
		res.download(file);
	}
};


module.exports = new Data();