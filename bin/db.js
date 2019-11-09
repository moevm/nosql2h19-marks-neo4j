var fs = require("fs");
var rq = require("./requests");

//А сдесь у нас функции для обращения к Болту (но не взаимодействие...
//  чаще всего)
// Прослойка между сервером и 
class Data{
	doResponse(request, res, func=(result, res)=>{}){
		const neo4j = require('neo4j-driver').v1;

		const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
		const session = driver.session();

		const resultPromise = session.run(
			request
		);

		resultPromise.then(result => {
		  session.close();
		  driver.close();
		  func(result, res);
		});
	}


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