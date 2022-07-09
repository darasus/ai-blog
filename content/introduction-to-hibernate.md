---
title: Introduction to Hibernate
createdAt: 2022-07-09T06:26:43.798Z
updatedAt: 2022-07-09T06:26:43.798Z
category: coding
---

Hibernate is a powerful, high performance object/relational persistence and query service for Java. It lets you develop persistent classes following common Java idiom - including association, inheritance, polymorphism, composition and the Java collections framework. 

Hibernate enables you to develop persistent classes following common Java idiom - including association, inheritance, polymorphism, composition and the Java collections framework. 

The Hibernate architecture is layered with each layer performing a specific task. The basic layers are:

Connection layer

This layer manages the connection with the database. It is responsible for providing connection objects to the other layers. The connection layer uses a connection provider to obtain connections from a pool of connections.

Transaction layer

This layer manages the transactions in hibernate. A transaction is a unit of work that is executed against a database. Transactions in hibernate are handled by an object called Transaction. The transaction object is obtained from a session.

Session layer

This layer is the most important layer in hibernate. A session is a single-threaded, short-lived object representing a conversation between the application and the persistent store. It is used to get a physical connection with the database. A session wraps a JDBC connection. It also holds first-level cache (of persistent objects). SessionFactory creates session objects.

Query and Criteria layer

This layer contains classes and interfaces that are used to perform queries against the database. HQL (Hibernate Query Language) and Criteria are used for writing queries in hibernate.

Object/Relational Mapping layer

This layer contains the mapping metadata that describes the relationship between the Java classes and the database tables. The mapping files are written in XML format. They are used to map persistent objects to relational database tables.
