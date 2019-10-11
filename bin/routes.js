const express = require("express");
const router  = express.Router();

router.use("/public", express.static('public'));


//Страница - список книг
router.get("/", (req, res, next) => {
    res.render("main", {});
    next();
});

router.put("/test", (req,res)=>{
	
	const neo4j = require('neo4j-driver').v1;

	const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
	const session = driver.session();

	const personName = 'Alice';
	const resultPromise = session.run(
	  req.body.req
	);

 	resultPromise.then(result => {
	  session.close();
	  
	  res.json(result);

	  const singleRecord = result.records[0];
	  const node = singleRecord.get(0);

	  console.log(node.properties.name);

	  // on application exit:
	  driver.close();
	});
	res.status(200);
});





function aaa()
{//Штука для обращения к БД
	const neo4j = require('neo4j-driver').v1;

	const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
	const session = driver.session();

	const personName = 'Alice';
	const resultPromise = session.run(
	  'CREATE (a:Person {name: "Joe"}) RETURN a'//,
	  //{name: personName}
	);

 	resultPromise.then(result => {
	  session.close();

	  const singleRecord = result.records[0];
	  const node = singleRecord.get(0);

	  console.log(node.properties.name);

	  // on application exit:
	  driver.close();
	});
}


module.exports = router;
