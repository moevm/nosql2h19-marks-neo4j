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
			`MATCH (F:Facultet)OPTIONAL MATCH (F)--(n:Napravlenie) return F.name, id(F), count(n)`,
			res,
			func
		);
	}
	getNapravlenie(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Napravlenie) return F.name, id(F)`,
			res,
			func
		);
	}
	/*getGroup(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Group) return F.num`,
			res,
			func
		);
	}*/
	getGroup(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Group) OPTIONAL MATCH (F)--(S:Student) return F.num, id(F), count(S)`,
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
	getKafedras(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Kafedra)OPTIONAL MATCH (F)--(l:Lesson) return F.name, id(F), count(l)`,
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
	//Убрать отметку
	dellAssesement(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Student)-[r]-(L:Lesson{name:"${params.lesson}"}) WHERE id(S)=${params.id}\
			DELETE r;`,
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
	

/////////////
//Страница 7
	_7(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (t:Teacher)--(l:Kafedra) WHERE id(t)=${params.id} return l.name, t.Lastname, t.Firstname, id(t);`,
			res,
			func
		);
	}
	//Получить все предметы которые ведёт препод(id)
	getLessons(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Teacher)--(L:Lesson) WHERE id(S)=${params.id} RETURN L.name;`,
			res,
			func
		);
	}
	//Получить все предметы которые может вести препод(id)
	getAnotherLessons(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Teacher)WHERE id(S)=${params.id} OPTIONAL \
			MATCH (S)--(:Kafedra)--(L:Lesson) WHERE not((S)--(L))  RETURN L.name;`,
			res,
			func
		);
	}
	addLessonToTeacher(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Teacher), (l:Lesson{name:"${params.lesson}"}) WHERE id(S)=${params.id} CREATE (S)-[:Teach]->(l);`,
			res,
			func
		);
	}
	dellLessonToTeacher(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (S:Teacher)-[r]->(l:Lesson{name:"${params.lesson}"}) WHERE id(S)=${params.id} DELETE r;`,
			res,
			func
		);
	}
	

////////////
//Страница 8
	getTeachAndLess(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (t:Teacher)--(l:Lesson) return l.name,id(t),t.Firstname,t.Lastname;`,
			res,
			func
		);
	}
	countAssesementByTeacherOnLesson(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (L:Lesson{name:"${params.lesson}"}) \
			OPTIONAL MATCH (s:Student)-[h]-(L) WHERE h.teach_id=${params.teacher} return h.assessment, count(h) ORDER BY h.assessment;`,
			res,
			func
		);
	}


////////////
//Страница 9
	workloadOnKafedra(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (K:Kafedra{name:"${params.kafedra}"})--(T:Teacher) \
			OPTIONAL MATCH (T)--(L:Lesson) RETURN T.Firstname, T.Lastname, count(L);`,
			res,
			func
		);
	}
	
	
///////////////////
//Страница Facultet
	getFacultetByID(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Facultet) where id(F)=${params.id} return F.name`,
			res,
			func
		);
	}
	getNapravleniaByFac(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F)--(N:Napravlenie) WHERE id(F)=${params.id} OPTIONAL MATCH (N)--(g:Group) return F.name, N.name, count(g), id(N)`,
			res,
			func
		);
	}
	//Добавить направление
	addNapravlenie(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Facultet)WHERE id(F)=${params.id} MERGE (:Napravlenie{name:"${params.napravlenie}"})-[:At]->(F);`,
			res,
			func
		);
	}
	//Удалить направление
	dellNapravlenie(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (N:Napravlenie) WHERE id(N)=${params.napravlenie} OPTIONAL MATCH (F:Facultet)-[r]-(N) WHERE id(F)=${params.id}\
			DELETE N,r;`,
			res,
			func
		);
	}

	
//////////////////
//Страница Kafedra	
	getKafedraByID(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Kafedra) where id(F)=${params.id} return F.name`,
			res,
			func
		);
	}
	getLessonsByKaf(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (K)--(L:Lesson) WHERE id(K)=${params.id} \
			OPTIONAL MATCH (L)--(P:Person) return L.name, id(L), count(P)`,
			res,
			func
		);
	}
	//Добавить предмет
	addLesson(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Kafedra)WHERE id(F)=${params.id} MERGE (:Lesson{name:"${params.lesson}"})-[:At]->(F);`,
			res,
			func
		);
	}
	//Удалить предмет
	dellLesson(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (N:Lesson) WHERE id(N)=${params.lesson} OPTIONAL MATCH (F:Kafedra)-[r]-(N) WHERE id(F)=${params.id}\
			DELETE N,r;`,
			res,
			func
		);
	}
	
	
//////////////////////
//Страница Napravlenie	
	getNapravlenieByID(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (n:Napravlenie)--(F:Facultet) where id(n)=${params.id} return n.name, id(F)`,
			res,
			func
		);
	}
	getGroupByNapr(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (F:Group)--(N) WHere id(N)=${params.id} \
			OPTIONAL MATCH (F)--(S:Student)\
			return F.num, id(F), count(S)`,
			res,
			func
		);
	}
	//Добавить группу
	addGroup(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (N:Napravlenie) where id(N)=${params.id} MERGE (:Group{num:"${params.group}"})-[:At]->(N);`,
			res,
			func
		);
	}
	dellGroup(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (N:Group) WHERE id(N)=${params.group} OPTIONAL MATCH (F:Napravlenie)-[r]-(N)\
			DELETE N,r;`,
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
