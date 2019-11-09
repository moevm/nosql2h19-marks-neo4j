# nosql2h19-marks-neo4j

## Рабочая среда

### Для запуска приложения необходимы:
* Node.js 10.16.3 LTS
* Neo4j Community Edition (login: neo4j; pass: 12345)

#### Настройка neo4j
Для корректной работы разрабатываемого приложения необходимо установить [пакет apoc](https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/). Для этого:
1. Скачать _apoc-<...>.jar_, где <...> соответсвует версии установленного Neo4j Community Edition;
2. Перейти в корневую деррикторию neo4j;
3. Поместить скачанный _.jar_-файл в папку _plugins_
4. Открыть для редактирования _neo4j.conf_ (находится в папке _conf_) и прописать в нём следующие строки:
`apoc.export.file.enabled=true
apoc.import.file.enabled=true
dbms.security.procedures.unrestricted=apoc.*
dbms.security.procedures.whitelist=apoc.coll.*,apoc.load.*,apoc.*`

Так же необходимо настроить путь импорта/экспорта для cypher-shell: 
    В файле _neo4j.conf_ необходимо заменить строку
    `dbms.directories.import=import`
    (иногда она может выглядеть как:
    `#dbms.directories.import=import`)
    на
    `dbms.directories.import=<...>\\data\\export`,
    где <...> соответсвует пути от корневого каталога neo4j до корневого каталога сервера.
**Путь должен быть относительным!**

#### Модули npm:
* express
* neo4j-driver
* pug
* body-parser
* cookie-parser
* multer

Для установки пакетов можно воспользоваться командой:
```
npm install
```
Запуск сервера осуществляется командой
```
node start.js
```
