function startTest(){
		ajaxPost(
			"/test",
			{},
			(req)=>{alert(req);}
		);
}