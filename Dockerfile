FROM openjdk:17

MAINTAINER Heinz <heinz.schloemer@gmx.net>

ADD backend/target/doggybag.jar doggybag.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGO_DB_URI -jar /doggybag.jar" ]