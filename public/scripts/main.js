function test(){
	ajax($("#txt").val());
}

function doImport(){
	ajaxPost(
		"/upload",
		{filedata: $("#import").val()},
		()=>{alert("Импорт завершён")}
	);
}
