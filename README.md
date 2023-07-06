                                    Shopbill
This web application is meant to provide an interface for the user to maintain his list of todo items. The salient features are automatically figuring out the time to go for the event, removing the past events & sorting the events by their occurrence time. The earlier ones are listed at the top.

![shopBill](https://github.com/srvnrsprm/shopBill/assets/90575076/88c1ef43-1999-4b2e-8b9c-9d9e55dab043)

Languages / Frameworks used:
============================
  * Java ( Java-XML bindings, JSP )
  * Apache Tomcat server
  * Postgresql DB
  * Ant build tool
  * JUnit testing framework
   
Tomcat server configuration:
============================
  You need to configure the database resource in the ```$TOMCAT_HOME/conf/context.xml``` as follows:
  ```
  <Resource name="jdbc/postgres" auth="Container"
          type="javax.sql.DataSource" driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://localhost:5432/$DB_NAME"
          username="$USERNAME" password="$PASSWORD" maxTotal="20" maxIdle="10" maxWaitMillis="-1"/>
```
  This resource element must be put inside the root element, ```context```. And replace the placeholders, (```$DB_NAME```, ```$USERNAME```, ```$PASSWORD``` ) with local values. The value for name attribute above mentioned as ```jdbc/postgres``` is used inside the java code and it must remain the same.


