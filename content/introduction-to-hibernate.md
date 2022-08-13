---
title: Introduction to Hibernate
createdAt: 2022-07-09T06:26:43.798Z
updatedAt: 2022-07-17T15:00:30.587Z
category: coding
summary: Hibernate is an open source, object-relational mapping mapping (ORM)
  implementation. The acronym ORM stands for Object-Relational Mapping. It’s a
  programming paradigm that allows you to access data stored in a relational
  database using the constructs of object-oriented programming (OOP) like
  classes, objects, inheritance, etc. Using this API, you can write code as if
  you are working with a local in-memory data structure but your code is
  actually accessing the database.
intro: >-
  High availability of services is a key success factor for enterprises and
  service providers. In today’s world, there is an increased penetration of
  mobile devices and other end user devices that need always-on services. So, it
  becomes essential for enterprises to implement systems that can handle
  frequent outages and are always available. 

  This blog is the first article in our Hibernate series where we will be covering all the concepts related to Hibernate. Here, we will begin by understanding What Is Hibernate? How Does It Differ From Other APIs? And learn about the different versions of Hibernate. We will also go through an introduction to the Architecture of Hibernate and its core components such as sessionFactory, Session, etc.
imageSrc: /articles/introduction-to-hibernate.png
imageSrcBase64: data:UklGRsQCAABXRUJQVlA4ILgCAABQEACdASoyADIAPm0uk0ekIiGhLhJJyIANiWkAE95fL/xV6GQ/I/IeBnum/8Bjs9Es/y3HzTG/7F/evRw/y/K/9Cf9T3Av5d/Tv+Z10f2d9kf9nR4u4CFhykHr1kvXIFHGvhttTE1RlC10A4s1m9Y2DWNcqbEsV3OiIWjNwX2OTNEZhM2R1HCO4CwAAP7+q1+//kqgn8v4x7PbABY/Jr3XcwIL5JD2XTQdGhTvt8bm9HU4oxS8lohqK6S7JRjrKP97evzIl/wBTpGJJm/8H09+N60OcHSd8dZ004C/z9j/HcWCfChM4NuIx9kCahKfzQ2R9YiTcO1g/+H4bunwSOWrf5C6cglPKRv1Xx59/hqzaecwNflO6dWMFUj9OJ7sT4Z29X415ibW4ulhgx95qhwE42tZykCj1+jtsOi/S/9xRa9g4SYZXCog7kALiW2Xa9bw/ocZ3yMtt5/Xg7I4PEkNVdSz3oRcZOTnIefMcruiTWlt20udP7NF4v+DExTQPPfqh49/FJ3Wtc9RV0azEKb7G5mI3uIIh2lgVCTodGHtkrWISZn5BcV1OMAe8L7SMHm3qYddx1IQY8LwEYn8D7/imN+QkfmBPQpYseI6XX7Hy/jzsf+ph6ANrMIF4LW+neWwFtkjBcUbvH2v3Ua1hs33R00IXxSPq1K1/xnR4XaSbvi/IBeIq6M5HWQw2/+n+c1pDqfz9A8Wg91Pk6SZSdIVIHAFUeZujXascBv81NU2+gAKe7YhLkUwOEFchLMNWNZC+bXKI3Pvb01NN4lDJHr0cC9niEeKqJO/qS4Z9mfklJvt2PNbTWNdZzNeycUn7VfuDOGcPUH28AUSA0E0M7pmMZ7ZtLrRRLpQOxmbY8IyYeu/X7XtcRwVxG/+ITlWyX2kKvRzJC0hvGM9h+t5UWgTwkQ2nOhAAAA=;base64,
---

## What is Hibernate?

Hibernate is an open source, object-relational mapping (ORM) implementation. The acronym ORM stands for Object-Relational Mapping. It’s a programming paradigm that allows you to access data stored in a relational database using the constructs of object-oriented programming (OOP) like classes, objects, inheritance, etc. In simple terms, using this API, you can write code as if you are working with a local in-memory data structure but your code is actually accessing the database.
Hibernate was initially developed by Gavin King in 2001 and was acquired by Red Hat in 2007. It’s one of the most widely used ORM frameworks. It is available in the form of a library that you can use in Java, .NET, C++, etc. Hibernate is an extremely powerful and flexible tool, but it also has a steep learning curve.

## Differences between Hibernate, JDBC and JPA

- Hibernate vs JDBC - Hibernate is both an ORM tool and a JDBC wrapper. You can use it to map managed objects to tables in a relational database. On the other hand, JDBC is purely a database communication API. It doesn’t provide any mapping functionality.
- Hibernate vs JPA - JPA is an ecosystem of standards and code patterns that facilitate the development of applications with a persistence backend (e.g. relational database). JPA specifies a standard mapping between the Java programming language and a relational database. Hibern-ate is an ORM tool. It doesn’t provide any mapping functionality. You need to use an Object Relational Bridge (ORB) like Hiber-nate to access data residing in the relational database.

## Why use Hibernate?

- It is an Object-Relational Mapping (ORM) framework that simplifies data access in modern programming language like Java, .NET etc. It allows you to write code as if you are working with a local in-memory data structure but your code is actually accessing the database.
- It facilitates the development of robust, high-performance, and distributable enterprise applications.
- Hibernate supports all major databases and is distributed across cloud environments.
- It is an open-source framework that is widely used and has an active community.
- It eases the communication between the application and the database by mapping the data types.
- It provides a high level of flexibility in data access and mapping.

## Hibernate Core Components

- Session: It is an instance of SessionFactory which is responsible for managing a transaction and a set of objects. A Session is a gateway to the underlying data source. It is responsible for managing a set of objects, executing SQL queries, and mapping results to the objects.
- SessionFactory: It is an instance of SessionFactory which is responsible for creating a Session.
- Configuration: It is an instance of Configuration which is responsible for managing the Configuration details.
- Types: It is an instance of Type which is responsible for managing the Type metadata.
- Session Metadata: It is an instance of SessionMetadata which is responsible for managing the SessionMetadata details.
- SQL Metadata: It is an instance of SQLMetadata which is responsible for managing the SQLMetadata details.

## Brief Introduction To Mapping Format

The mapping format between objects and tables is defined in the hibernate .hbm.xml file. The mapping file is created in a hierarchical format where the root element is hibernate-mapping> and the child elements represent the mapping between the objects and the database tables. Each mapping element has a name defined using the name> tag. The select> tag is used to define the mapping between result> and select> tables. The select> table is an in-memory representation of the database table. result> table is a mapping table that has the mapping information between select> table and the database table. The where> tag is used to define the where condition. The insert> tag is used to insert data into the database. The delete> tag is used to delete data from the database. The update> tag is used to update data in the database.

## Wrapping up

This brings us to the end of this blog. We hope that you have found it insightful and useful. We will be coming up with more blogs in this series. In the meantime, if you have any questions or suggestions, do drop us a line in the comments section below. Stay tuned for more! 

## Conclusion

Hibernate is an open source, object-relational mapping (ORM) implementation. The acronym ORM stands for Object-Relational Mapping. It’s a programming paradigm that allows you to access data stored in a relational database using the constructs of object-oriented programming (OOP) like classes, objects, inheritance, etc.

Hibernate facilitates the development of robust, high-performance, and distributable enterprise applications. It is an extremely powerful and flexible tool, but it also has a steep learning curve.

## What is Hibernate?
