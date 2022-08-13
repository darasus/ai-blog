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
imageSrcBase64: data:UklGRuwEAABXRUJQVlA4IOAEAAAwGACdASoyADIAPm0okUWkIiGY/HW0QAbEtQBB+qePgOVd5ngTOx/vu4n6gNsB+1XqA86TTAN5s/zFfbfY/BnwreK/ZPQD+j/5j8qvNm8F/dzkx/x29occ/n/+n7k30A+nv+g9Sn874gb5N/p/YA/jv83/4H9l9Zr/Z+5n2rfTH/Z9wn+W/3Hq3eheIazRcFTgIwcpTRuA0sS1DE7oId0/uqS8YIxlmNC6oUnqlAtc63BaMKoBvjpRXsWQiSpYo+hdoFG5M9et0QAAAP7xdUh3FHcwkqY/fJLZCfPrAIz3JCWaWhKzRR4ppRn/f8kor2qJ3sWXTjnHn8CcA0LfU8IBLycg5+EUeHKV2wDMNedRs4ba496uns/QpGh92o1AmzEmup1Y3p+KSm7Zx2AkO7ZtGNAgHfO9dOuXvR/IVf0bkf+///xGvt5bET6715jhKKJq344eFfyzJv/8fg9T7iPK4kgCgJcHxAw7OcEkNzvHVGSiyPiMA+MgBHVYdjS9UQZMLML3u/P3pGXvoSbpdq7cH+7f/3ARS9cDKerKUHLO+YZaIzG3/xy/POJI/ig67WOXjLO/rvBRyek0fG8710NDDJPlHm44xPuGW3JtrKS28OQpzYAs5v+E3mV3FlWRDfSRMX1e77dnzg2wdyOlr6mStTM7aMlL1u9/KDJcc+CYybXYznWM++PKymccHettfiNwKh+7GVLRAnX54GDQElAVXkns6VlzhYAaKOBWHu/1Mh7J8IV5Mn3fdCFVthP1h10/Wj9pgPfrG/3/+CfpqMzM+fxpLGzHvs//1/+RuC3T+lAw94xZhRUU2xE/odZgPuDa7KtpdrN5pfDtQPU+AHy2f4ZYMJ1GdnVTC5+4S9ujV4B9aW7kf83ogQEzxkejwvtLu+/93mfbRCunzjwR5Kw7pYoWjHVt3N3gpBt43lr91cMUqAZEfYV9HKuS6rBtSwXrh03Mz8oYLO+WmASlK/zrs+bu+b+5Im1K+egLIWMfx2IR40WJcSogzrTxeMAt/HR6KNxagULj5hWhEbG0oeQhyntGrWR4QtU5e2tXIyL5fxi5/MZan7woSEv0Z8+nqizcSAW+N7LQ/s1+RYjaJ7siA45k4fAZC+PcI8Yf5DSQDXwvjzVZ54K29WBsWEHM6rjcCozDfOKLgVNEOkXJ/7y41DQhDBXp4WerxiI7oH6E87QDsvHFizZkzUM+LA941XREKigjCr9K5kvnGKXP7/9zPC9LsHQffe5Yx0JW2M+q07Twwh5qnp+f/wENNy+kyN6xbyI51oAQch+FQ/tCU8b928TopdBP5x+Mmz/usigG28VqcuWREgd3zP91mP6/3UR2d647mYFhm8oD1QBX/Lbv2SaP2m9heyCNB/Bx8ZR+s8zO6pBCmaBZqpmqwZ57y7OEywjLaK5URPykkutt9OksjqpDWoj5PcDvpNdf8RERKmpxQl85pCOkFTKLhyGcEIBh5Br/SC58a3bOA/E2VdzSXwxfL40m48fDRobEMCxF4oaxY+1/HTqkRwuV1oGgErgJcLvrwirVNN+IpOw1AVdxXL1wJTlBYFvV01hTSZutdTLvAWedXcXGv6f8/fuYdyfAptPzziU8UdvQb/IUZwJawWri/CdUpOjhraIVxtGkJ3EamRUh9FVAF/wQ4AAAAAA=;base64,
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
