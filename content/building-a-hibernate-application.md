---
title: Building a Hibernate application
createdAt: 2022-07-09T06:26:59.842Z
updatedAt: 2022-07-17T15:00:30.596Z
category: coding
summary: Hibernate is an open source Object-Relational Mapping (ORM) library. It
  is the most widely used tool for mapping Java objects and database tables. It
  can be used in any type of application, but is particularly appealing to
  developers who use a Java-based programming language. The logic to retrieve
  data from a database is built into the library. In this article, we looked at
  the fundamentals of setting up a project, creating tables and handling user
  logins. We also discussed the best practices in setting up and creating a Java
  domain model.
intro: >-
  In this article, we will build a basic application using Hibernate as an
  Object-Relational Mapping library. We will cover the fundamentals of setting
  up a project, creating tables and handling user logins.

  We have all probably heard of SQL databases before. They are used to store data in tables so that you can query the data efficiently. Each table has columns with the properties of that entity stored as values in those columns.

  However, building an entire database from scratch is not something that most developers would want to do on a daily basis. This is where Object-Relational Mapping (ORM) libraries come in useful. Instead of dealing directly with SQL tables and their contents, you can use these libraries to represent your domain objects as entities in their own right. Once you’ve done that, it becomes much easier to persist them into your database without writing any SQL statements yourself!
imageSrc: /articles/building-a-hibernate-application.png
imageSrcBase64: data:UklGRkICAABXRUJQVlA4IDYCAAAQDACdASoyADIAPm0sk0YkIqGhLhkqqIANiWMA1EOy6u/0a9wGcA5/8/E13SZdrekGwW8ZKOd0T5W8X5rADDHQCoGaCHiqm98qi96adyO4Cgl9i8M91FQWj+bCF7AMdQfda0iuW4UVhCAA/vpxoWBIOMHRCCmm7mlqDCLnql3adTAjqmrBJythn2alZNa3GQfTwR+LuT4Pro+sVNCiLJBAeDzMh+9xQu3aE6Egl57vAg+cbfZ58VYP9A/x0g56gNHFyIgzj5zEgT7iSPexak/Kh1mjLzQsDHt9vqELTBp08WV1/YWNdJdrO+14SJ+OfbvUmNW3Uag8mDomey7UM7JbmAwjTlT9Nq/cCDqXwt8vfckjqnbt9zl1wfBNkIO3sNw99xvlsHuJ0It3ax/eBiBV+hMlY6uxXPramvBEoIjU7XpDvTso6FZSJaUWhLiHqA9CPwL2Qs1azJUvzYvkP757U4GDHfgvLqzOdZe9PGyeghUgh1HTLrqwYt9Mf/vSlu1aqI5B0dPJDctRVlEbw39/4bq/34QXv/iV3/b42vmd/Bw2q7w4dX4KJ/ghCsZH/P9FxCc/4mia6Bq34k31b0+p1ugbT91ZdGOkLzqruv8KVNxTv3EYNVzWwYT4HiSaPrMCa0gGwISnJ/31kjFNHX7R6EXXPhgAs95QMfIRH0EbCZmt2TlEodQmnOlmM7CgNBsHO+Ww9U79195Gm1Eq5nA4J312wOqjZD4RwAuh9PITyDQ/ZGwAAA==;base64,
---

## Introduction to Hibernate

Hibernate is an open source Object-Relational Mapping (ORM) library. It is the most widely used tool for mapping Java objects and database tables.
Hibernate is designed to be independent of a particular database system. It is supported by many database vendors including Oracle, Microsoft, IBM, and PostgreSQL. It can be used in any type of application, but is particularly appealing to application developers who use a Java-based programming language.

The great advantage of Hibernate is that it relieves us from writing SQL statements. The logic to retrieve data from a database is built into the Hibernate library. This means you can focus more on the domain model of your application and leave the database-specific details to the Hibernate library.

## Installing Hibernate in our Java Project

First, we need to install Hibernate on our computer and set it up within our Java project. To do this, we need to download the latest version of Hibernate from the official Hibernate website.

Next, we need to make sure that our build tool knows about the Hibernate libraries. To do this, we will modify the build.gradle file in our project directory.

build.gradle 

## Creating and Running a Maven Project with Hibernate

If you haven’t yet created a Maven project, you can follow this Maven tutorial and create a new directory for your Hibernate project. Within this new directory, you can create a pom.xml file to define some information about our project and its dependencies. Now, we can add the Hibernate libraries to our dependencies and create a Java domain model.

pom.xml 

## Building the User table and persistence code

After creating a simple Maven project and adding the Hibernate libraries, we can create a user table in our database. To do this, we need to create a class called User in our Java code and add fields for each of the columns in our table.

After creating the class, we can call the save() method on the User instance to persist it to the database. If you are using PostgreSQL, you can use the create() method instead.

User.java 

## Conclusion

In this article, we looked at the fundamentals of setting up a project, creating tables and handling user logins. We also discussed the introduction to Hibernate and how to install it on our computer. We also discussed the best practices in setting up a Maven project and creating a Java domain model. Hibernate is an excellent tool to manage database tables and their contents and to easily persist objects to a database.
