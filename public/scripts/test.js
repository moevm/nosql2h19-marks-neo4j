function startTest(){
		console.log($("#test1").val());
		console.log($("#test2").val());
		
		ajaxPut(
			"/ajax",
			{
				test1: $("#test1").val(),
				test2: $("#test2").val()
			}
		);
}