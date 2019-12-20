FROM node:8

RUN apt update \
 && apt install -y openjdk-8-jdk \
 && apt install -y git \
 && apt install -y wget \
 && apt install -y tar

WORKDIR /opt/

RUN wget https://neo4j.com/artifact.php?name=neo4j-community-3.5.14-unix.tar.gz \
 && tar -xf *neo4j* \
 && mv neo* neo4j \
 && rm *.gz \
 && wget https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/3.5.0.6/apoc-3.5.0.6-all.jar \
 && mv apoc* neo4j/plugins/ \
 && echo "apoc.export.file.enabled=true" >> neo4j/conf/neo4j.conf \
 && echo "apoc.import.file.enabled=true" >> neo4j/conf/neo4j.conf \
 && echo "dbms.security.procedures.unrestricted=apoc.*" >> neo4j/conf/neo4j.conf \
 && echo "dbms.security.procedures.whitelist=apoc.coll.*,apoc.load.*,apoc.*" >> neo4j/conf/neo4j.conf \ 
 && grep '=import' -P -R -I -l  neo4j/conf/neo4j.conf | xargs sed -i 's/=import/=..\/nosql2h19-marks-neo4j\/data\/export/g' \
 && grep '#dbms.security.auth_enabled=false' -P -R -I -l  neo4j/conf/neo4j.conf | xargs sed -i 's/#dbms.security.auth_enabled=false/dbms.security.auth_enabled=false/g' \
 && git clone https://github.com/moevm/nosql2h19-marks-neo4j && cd nosql* && npm install

RUN echo "#!/bin/bash" >> run.sh \
 && echo "echo 'run neo4j server'" >> run.sh \
 && echo "while [ \` tail -2 ./neo4j/logs/neo4j.log | grep -c -e 'Started'\` == 0 ]" >> run.sh \
 && echo "do" >> run.sh \
 && echo "sleep 1" >> run.sh \
 && echo "done" >> run.sh \
 && echo "echo 'neo4j server ready'" >> run.sh \
 && echo "echo 'run main server'" >> run.sh \
 && chmod +x run.sh 

EXPOSE 3000

CMD /opt/neo4j/bin/neo4j start >> /dev/null && ./run.sh  && cd no* && node ./start.js
