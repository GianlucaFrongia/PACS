FROM maven:latest as maven
WORKDIR /usr/src/app
COPY server/histofy /usr/src/app
RUN --mount=type=cache,target=/root/.m2 mvn package -T 1C -DskipTests

FROM tomcat:latest
WORKDIR /usr/local/tomcat/webapps/
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=maven /usr/src/app/target/server.war /usr/local/tomcat/webapps/server.war

WORKDIR $APP_DATA_FOLDER

ENTRYPOINT ["catalina.sh", "run"]
