//Основная функция для отправки "типового" запроса
//  (на вход - строка-запрос а-ля cypher-shell; функция-обработчик ответа сервера (точнее поля records)
function ajax(params, handler = basicHandler){
	$.ajax('/ajax', {
		type: "PUT",
		data: {req: params},
		success: (ret)=>{
			handler(ret.records);
		}
	});
}

//Функция для разбора ответа (поле "запись" neo4j-серера
// на вход - ответ от neo4j
// на выход - json типа:
// {
// 		fields: [field1, field2,...],
//      stats:  [[a11,a12,..],[a21,a22,...],...] 
// }
function responseRecordsParser(records){
	let ret = {
		fields: records[0].keys,
		stats: []
	};
	for (rec in records)
		ret.stats.push(records[rec]._fields);
	
	
	return ret;
}
function createTable(data){
	let table = "<table border=1><tr>";	
	for (i in data.fields){
		table += `<th>${data.fields[i]}</th>`;
	}
	table += "</tr>";
	
	for (i in data.stats){
		st = data.stats[i];
		table += "<tr>"
		for (j in st)
			table += `<td>${st[j]}</td>`;
		
		table += "/<tr>"
	}
	
	return table + "</table>";
}

//Базовая функция для вывода на экран ответа сервера
// на вход - запись, id div-а, куда запихнём таблицу-ответ
function basicHandler(records, id = "retTable"){
	if (records.length==0)
		return;
	
	
	
	
	$(`#${id}`).html(createTable(responseRecordsParser(records)));
}