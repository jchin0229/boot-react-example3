This project was build using the following link:
http://matejsprogblog.blogspot.com/2017/06/creating-new-web-app-using-create-react.html

This project is an updated with separate front-end and back-end directory.

...
mkdir boot-react-example
cd boot-react-example
...

To build the front end: use the following commands:
```
npm install -g create-react-app
create-react-app front-end
npm start (start front end app)
```
>>check localhost:3000 to see frontend app

The following is the pom.xml for building the front-end using maven.

The job will create the web app resource into the build directory.

If you want a jar file, you will need the resource copy plugin in pom.xml in
the backend directory to copy them to target directory and build using the packaging of jar.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>
 <groupId>com.blogspot.matejsprogblog</groupId>
 <artifactId>front-end</artifactId>
 <version>0.0.1-SNAPSHOT</version>
 <packaging>pom</packaging>
 <parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.5.2.RELEASE</version>
 </parent>
 <properties>
  <java.version>1.8</java.version>
 </properties>
 <dependencies>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
 </dependencies> 
<build>
 <plugins>
  <plugin>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-maven-plugin</artifactId>
  </plugin>
  <plugin>
   <groupId>com.github.eirslett</groupId>
   <artifactId>frontend-maven-plugin</artifactId>
   <version>1.4</version>
   <executions>
    <execution>
     <id>Install node and npm locally to the project</id>
     <goals>
      <goal>install-node-and-npm</goal>
     </goals>
     <configuration>
      <nodeVersion>v8.0.0</nodeVersion>
      <npmVersion>5.0.3</npmVersion>
     </configuration>
    </execution>
    <execution>
     <id>npm install</id>
     <goals>
      <goal>npm</goal>
     </goals>
    </execution>
    <execution>
     <id>Build frontend</id>
     <goals>
      <goal>npm</goal>
     </goals>
     <configuration>
      <arguments>run build</arguments>
     </configuration>
    </execution>
   </executions>
  </plugin>
 </plugins>
</build>
</project>
```

To build the backend: use the following commands:
```
mkdir back-end
mkdir src
```

>>create BootReactExample and GreetingController in main/java directory.

>>mvn spring-boot:run

>>check localhost:8080/greet for backend application to return "hello world"

Additional step is needed in front-end to make request to backend.
See App.js for request changes.

The following is the pom.xml for building the back-end and packagin the front-end together using maven.

The job will copy the front-end web app resource into the target directory.

If you want a separate jar file for the backend, you can remove the copy plugin
in the pom.xml.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>
 <groupId>com.blogspot.matejsprogblog</groupId>
 <artifactId>back-end</artifactId>
 <version>0.0.1-SNAPSHOT</version>
 <packaging>jar</packaging>
 <parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>2.0.5.RELEASE</version>
 </parent>
 <properties>
  <java.version>1.8</java.version>
 </properties>
 <dependencies>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-test</artifactId>
   <scope>test</scope>
  </dependency>
  <dependency>
   <groupId>org.hamcrest</groupId>
   <artifactId>hamcrest-library</artifactId>
   <version>1.3</version>
   <scope>test</scope>
  </dependency>  
 </dependencies> 
 <build>
 <finalName>boot-react-example</finalName>
 <plugins>
  <plugin>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-maven-plugin</artifactId>
  </plugin>
  <plugin>
   <groupId>org.apache.maven.plugins</groupId>
   <artifactId>maven-resources-plugin</artifactId>
   <executions>
    <execution>
     <id>Copy frontend build to target</id>
     <phase>process-resources</phase>
     <goals>
      <goal>copy-resources</goal>
     </goals>
     <configuration>
      <outputDirectory>${basedir}/target/classes/resources</outputDirectory>
      <resources>
       <resource>
        <directory>${basedir}/../front-end/build</directory>
        <filtering>true</filtering>
       </resource>
      </resources>
     </configuration>
    </execution>
   </executions>
   </plugin>
 </plugins>
</build>
</project>
```
 
Note: if the front/backend application is not on the same deployment site, 
a proxy is necessary in the package.json file of the frontend project.

The parent pom.xml to build both the frontend and backend:
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
 <modelVersion>4.0.0</modelVersion>
 <groupId>com.blogspot.matejsprogblog</groupId>
 <artifactId>boot-react-example</artifactId>
 <version>0.0.1-SNAPSHOT</version>
 <packaging>pom</packaging>
 <modules>
      <module>front-end</module>
      <module>back-end</module>
  </modules>
 <properties>
  <java.version>1.8</java.version>
 </properties>
</project>
```
```
mvn clean package && java -jar back-end/target/boot-react-example.jar
```
>>check localhost:8080 for frontend application to return "hello world" in web page.
