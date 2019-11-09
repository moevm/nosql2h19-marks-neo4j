var fs = require("fs");

class Requests{
	constructor(){
		this.labels= [
			"Facultet", 
			"Napravlenie",
			"Group",
			"Student",
			"Kafedra",
			"Lesson",
			"Teacher",
			"At", 
			"Teach",
			"Has",
			"Works"
		];
	}
	
	
	//"Берёшь запрос и посылаешь Болту. В случае чего
	//   пни Функа - он будет знать что делать с результатом"
	doRequest(request, res, func=this.standartFinal){
		const neo4j = require('neo4j-driver').v1;

		const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
		const session = driver.session();

		const resultPromise = session.run(
			request
		);

		resultPromise.then(result => {
		  session.close();
		  driver.close();
		  func(res, result);
		});
	}
	
	
	//Затычка на "выполнил запрос - изволь доложить клиенту"
	standartFinal(res){
		res.end();
		res.status(200);
	}
	
	
	//Набор запросов для импорта
	cleanDB(res, func = this.standartFinal ){
		this.doRequest(
			'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r',
			res,
			func
		);
	}
	
	
	doImport(res, func = this.standartFinal ){
		this.doRequest(
			fs.readFileSync("./bin/cypher-shell/import.txt","utf8"),
			res,
			func
		);
	}
	
	
	remCrutchID(res, func = this.standartFinal){
		this.doRequest(
			'match (n) REMOVE n.id;',
			res,
			func
		);
	}
	

	//Набор запросов для экспорта
	backupNodes(res, func = this.standartFinal){
		for (let i=0;i<7;i++)
			this.doRequest(
				`CALL apoc.export.json.query('Match (n:${this.labels[i]}) return COLLECT(n) as list','${this.labels[i]}.json');`,
				res,
				func
			);
	}
	backupRelSh(res, func = this.standartFinal){
		for (let i=7;i<11;i++)
			this.doRequest(
				`CALL apoc.export.json.query('Match ()-[r:${this.labels[i]}]->() return COLLECT(r) as list','${this.labels[i]}.json');`,
				res,
				func
			);
	}

};

module.exports = new Requests();