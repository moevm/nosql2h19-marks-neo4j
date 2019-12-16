var fs = require("fs");

class Requests{
	constructor(){
		/*this.labels= [
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
		this.kolNodes = 7;
		this.kolRels  = 4;*/
	}
	
	
	/////////////////////////////////////////////////////
	//В данное мето необходимо помещать отправку запроса:
	test(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (F:Facultet)--(N:Napravlenie)--(G:Group)--(S:Student) return F.name, N.name, G.num, S.Lastname, S.Firstname;`,
			res,
			func
		);
	}
	
/////////////
//Страница 2
	_2(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (F:Facultet)--(N:Napravlenie)--(G:Group)--(S:Student) return F.name, N.name, G.num, S.Lastname, S.Firstname, id(S);`,
			res,
			func
		);
	}
	//Добавить студента
	addStudent(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (G:Group{num:"${params.num}"}) CREATE (:Person:Student{Lastname:"${params.Lastname}",Firstname:"${params.Firstname}",telephone:"${params.telephone}",Sity:"${params.Sity}"})-[:At]->(G);`,
			res,
			func
		);
	}
	//Удалить студента
	delStudent(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Student) WHERE id(S)=${params.id} OPTIONAL MATCH (S)-[r]-() DELETE S,r;`,
			res,
			func
		);
	}
	//Фильтры для студентов	
	getFilter(res, func = this.standartFinal, params = {}){
		
		let facultet = `"${params.facultet[0]}"`
		for (let i =1; i< params.facultet.length;i++)
			facultet += `,"${params.facultet[i]}"`;
		
		let napravlenie = `"${params.napravlenie[0]}"`;
		for (let i =1; i< params.napravlenie.length;i++)
			napravlenie += `,"${params.napravlenie[i]}"`;
		
		let group = `"${params.group[0]}"`
		for (let i =1; i< params.group.length;i++)
			group += `,"${params.group[i]}"`;
		
		this.doRequest(
			`match (F:Facultet)--(N:Napravlenie)--(G:Group)--(S:Student) \
				WHERE F.name in [${facultet}] AND N.name in [${napravlenie}] AND G.num in [${group}]\
				return F.name, N.name, G.num, S.Lastname, S.Firstname, id(S);`,
			res,
			func
		);
	}
	getFacultet(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Facultet) return F.name`,
			res,
			func
		);
	}
	getNapravlenie(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Napravlenie) return F.name`,
			res,
			func
		);
	}
	getGroup(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Group) return F.num`,
			res,
			func
		);
	}
	
	
////////////
//Страница 3
	_3(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (K:Kafedra)--(T:Teacher) return K.name, T.Lastname, T.Firstname, id(T);`,
			res,
			func
		);
	}
	//Добавить препода
	addTeacher(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (K:Kafedra{name:"${params.name}"}) CREATE (:Person:Teacher{Lastname:"${params.Lastname}",Firstname:"${params.Firstname}",telephone:"${params.telephone}",Sity:"${params.Sity}"})-[:Work]->(K);`,
			res,
			func
		);
	}
	//Удалить препода
	delTeacher(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Teacher) WHERE id(S)=${params.id} OPTIONAL MATCH (S)-[r]-() DELETE S,r;`,
			res,
			func
		);
	}
	
	
////////////
//Страница 5
	_5(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (F:Facultet)--(N:Napravlenie)--(G:Group)--(S:Student) WHERE id(S)=${params.id} return F.name, N.name, G.num, S.Lastname, S.Firstname, id(S);`,
			res,
			func
		);
	}
	//Получить все оценки студента (id)
	getAssessmets(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Student)-[H]-(L:Lesson) WHERE id(S)=${params.id} OPTIONAL MATCH (T:Teacher) WHERE id(T)=H.teach_id RETURN L.name, T.Lastname, T.Firstname, H.assessment, H.date;`,
			res,
			func
		);
	}
	//Выставить отметку
	addAssesement(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Student), (L:Lesson{name:"${params.lesson}"}) WHERE id(S)=${params.id}\
			CREATE (S)-[:Has{date:"${params.date}", assessment:"${params.assesement}", teach_id:${params.teacher}}]->(L);`,
			res,
			func
		);
	}
	//Получить Возможные оценки и кто их проставит
	getLessAndTeach(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Student) WHERE id(S)=${params.id} OPTIONAL MATCH (t:Teacher)--(l:Lesson) WHERE not ((S)--(l)) return l.name,id(t),t.Firstname,t.Lastname;`,
			res,
			func
		);
	}
	

////////////
//Страница 6
	//Ср. оценка на факультете за период
	avgAssessmentPerFacultetFromDate(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Facultet{name:"${params.name}"})--()--()--()-[h:Has]-() \
			WHERE toInt(split(h.date,'.')[2])>=${params.at} AND toInt(split(h.date,'.')[2])<=${params.from} \
			RETURN toInt(split(h.date,'.')[2]) AS Date, avg(toInt(h.assessment)) ORDER BY Date;`,
			res,
			func
		);
	}
	
	//////////////////////////////////////////////////
	///////////V/u/l/p/i/s///m/a/g/i/c////////////////
	//////////////////////////////////////////////////
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
		for (let i=0;i<this.kolNodes;i++)
			this.doRequest(
				`CALL apoc.export.json.query('Match (n:${this.labels[i]}) return COLLECT(n) as list','${this.labels[i]}.json');`,
				res,
				func
			);
	}
	backupRelSh(res, func = this.standartFinal){
		for (let i=this.kolNodes;i<this.kolNodes+this.kolRels;i++)
			this.doRequest(
				`CALL apoc.export.json.query('Match ()-[r:${this.labels[i]}]->() return COLLECT(r) as list','${this.labels[i]}.json');`,
				res,
				func
			);
	}


	getLabels(res, func = this.standartFinal){
		this.doRequest(
			'match (n) return distinct labels(n);',
			res,
			func
		);
	}
	
	getRelationships(res, func = this.standartFinal){
		this.doRequest(
			'match ()-[r]-() return distinct type(r);',
			res,
			func
		);
	}
};

module.exports = new Requests();