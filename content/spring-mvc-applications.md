---
title: Spring MVC applications
createdAt: 2022-07-09T06:26:29.107Z
updatedAt: 2022-07-17T15:00:30.586Z
category: coding
summary: Desktop applications built with the Spring MVC framework are typically
  web applications intended to be run inside a desktop environment. They are
  usually accessed by the user through a browser, and then the desktop
  application is launched within the browser itself. This type of architecture
  allows the user to have access to the entire functionality of the. desktop
  application, while only being constrained by the web browser they are using.
  The most straightforward route would be to build a “Spring Boot Based Desktop.
  GUI Application” The Desktop. application will be built using the default
  settings of a Spring Boot project and no configuration changes will be
  required.
intro: >-
  When you think of an application, it usually means a program with some
  specific functionality that’s usually stand-alone or something that needs to
  be accessed by multiple users simultaneously. In programming terms, these are
  generally referred to as “desktop applications” and are not commonly built
  using the same frameworks used for websites or mobile applications. However,
  when it comes to creating an application with Spring MVC, the options are
  virtually limitless. 

  In this blog post we will take a look at various examples of Spring MVC applications. These can range from simple tutorials on building your own stand-alone desktop applications with Spring Boot or extending existing web apps with some custom logic and functionality that’s only available through an extension or plugin.
imageSrc: /articles/spring-mvc-applications.png
imageSrcBase64: data:UklGRr4FAABXRUJQVlA4ILIFAADQGgCdASoyADIAPm0oj0WkIqEY/VW0QAbEtgBOma99r9r80+7NV0KPbh/wn+q9l/LVeqH9pfUB+wHrD+gneUfQA/VX05f2j+Dz++/9OuzeD/hy9X+1+VM/X+WnfP71/57yI/3negQAfl3CP9aug3vfZkf9689b/g/w3oD+j/+/7g/68f8/sc+hsb/NVhJKKTYHjare84TgevQkIIkPm6KB7fKkbyeP9esc9aew8Fid4l3zZ/77yN6ef7BFKDCALJtxH+s7CuRlBBrZE8MAV6ru/JMyx5Z3a3bdDHXZ+rwAAP797waDZF2rpu+RfLVHx/KRuRvN2ZemDEoV6mZstlHVZTT378QAkbFDY3u2IaVEyXaZTLpE1v3V8SOm6nncfRU44amPJgnsp8OJn9+pPx5mtZMlf1teGvxe4GSdRWp+/A9RKs2Lpc5oSe+ffmeuAgVByPEd5w5VTCl+9koLYadmTotLcqq00VS4XOtBGRY5r7Q6c8xXkWKLAZCZu0m+rDXEcW1gqcJmoYNBFrvGYC5ADl4o1GRZgaJwKHxHjXOmOELlBnbcVrv40MPd33sSf7N7QvOO3+two6B5eqRtnoUkhu7IHNEOXlJ2y23Q9+hQigWhOunwyn6grDuPZaeGwqZwZcpF/iGckzayroOYvXBQDk5L2KxuUaO2Vz7QG16PcZXTJIr88NxumvJGNqUaqLTMjmikT2aLSHQbSCAnHGZ9Pg3w0J35o1VSlytD4D8xCiq9QAx9OaP08t1aiemGhuAJLbwm3VTcoGsMzdzy9cNpfsUizzubqqLwJQ2fG6swh8TwxS6rmi+T7/jXJ734P6wY+iknfys/yT8+dk9ssjzGeQVx8vRSw3EDzDpYI3rb/PDhk+r6EwFDLDc+eev/oOpiDahXtqPO9BuS3ozoKq7m0QMNaUe9eblH3w55xb1HXgVpI8kWIakHFM2lWvB3/ULl6HW+RMlPga4+21lb+kjYzOX2Ot7Bfr1bM599q/Je774fO/L8AGGb/qCzBJy5aEUq5WbsVMO7b+gYjmeTA7VvxiJ13dmTivvBxdXyNlgnrQtIJHSc1oI/8OkzfSj7UEj4IdqdGSNFzDzXGOYygtLNRNjc4cHbEWp/kw0rbXfrlsO4mLgLSHdkrb2jDdun2KcuiWkujEgLCP40LM8qQUV1c/J3YzFoEmIxzfjAGP3qP9JtT8F1eB1PITQ1ksD89TKZ36XA8TUGoZmzzGylHlKH1vSxsgYsWCxjqaM49t04CPpYY9R9a0zuQnwQFz0oqBA3+PI+cuCtVt5D6P8MgqzB5nMdQ7TUZ70TnoTpWzxr9FHYyigdkY1BrJyVH4aPe5fbufUAY19oilvHKAb0nntc2wLQdEH/r1kgcpzvTLL7BASx8n4bwPmBcPsZM/XIuX47nE99mpFfBQ8Z3TS98O4pQy/pG7NjDcgu0CuzMfZhf2/bTAWHMac4oOD9xug2Tv4QW+DtQ3ys/5uvhawBnZjRjr9KKpEoxhFQJUC34Gp9lnb1t2hhKo53XNy9l9o5jofNL9TrMkssYQ4vE/CkSXaeed/M2rP7G8xh1E46PHhaleR3NnIzaYwMauLnnHpLzhOnOEpidAaCvrcx4YWTkkcfpjBbzA1TuZ36Ip584ikZGWTPjSE/oPQfKMT0CZHEMzt/J3zo4fZrNtEZW3MF0DRT8WJVQoM85/SNSS+3B2qFVahszchZOo/TGeJtNqTurDIZnp5F/7Heqq0QqjKvr3+v4zSK17bc0THqnTLJ7eFItd8WkF1y+KUljXUBG1TrrsOqRTqiXBpLAjxuFr/Y/iuwC0y+G0etDyZH+tuXttXpX+B+5KvU6fPTJXUbLowX20MG+CMD/j1v4zIZOL3+PW/jLZZ745rgAlTVDAzDk9UdTLqZyVI/VpYNCH4JdKOvycnbZQ36IwXH3hoMY3YBqoAAAAA=;base64,
---

## Spring MVC Based Desktop Applications

Desktop applications that are built with the Spring MVC framework are typically web applications in nature and are intended to be run inside a desktop environment, such as on a Mac or Windows PC. They are usually accessed by the user through a browser, and then the desktop application is launched within the browser itself. This type of architecture allows the user to have access to the entire functionality of the desktop application, while only being constrained by the web browser they are using.
For example, let’s say you were building a desktop application that provides some sort of financial management functionality. With this type of desktop application, the user will be able to interact with all areas of the software from their browser, while having access to the data being managed in the desktop application as well. This would allow the user to add new transactions and financial information from their browser, as well as view it all from the same interface.

## Spring Boot Based Desktop GUI Apps

If you are already familiar with developing desktop applications, but would like to take a shortcut to get to their core functionality, then the most straightforward route would be to build a “Spring Boot Based Desktop GUI Application.” The Desktop GUI application will be built using the default settings of a Spring Boot project and no configuration changes will be required.

To begin, create a new Maven project using the “Spring Starter” credentials. Then, after your project is created, you will want to add the following dependencies to your project’s pom.xml file.

The first dependencies listed above are the necessary dependencies for the sample. The next two are dependencies required by the sample itself. With these dependencies added to your project, you will be able to create a desktop application with a GUI.

## Creating Web Applications with Spring MVC and Spring Boot

If you are looking to build a web application with Spring MVC, you will want to use a starter that’s meant for web applications. Depending on your preferred version of Java, there are multiple starter templates that can be used.
The templates that are available for the Java versions are listed below.

Java 8 - ha-spring-boot-starter-web, ha-spring-boot-starter-webfiler, ha-spring-boot-starter-thymeleaf, ha-spring-boot-starter-logging

Java 11 - ha-spring-boot-starter-Web, ha-spring-boot-starter-thymeleaf

In addition to the Java versions listed above, there are also Spring Boot starter templates available for other types of applications, such as those that are built using the Spring Integration framework.

## Rich Internet Applications (RIA) with Spring MVC

If you are building a Rich Internet Application (RIA) with Spring MVC, you will want to make use of the Spring MVC RIA starter. This starter provides all the necessary dependencies and configurations needed to implement a RIA with Spring MVC.
The starter also provides the option of choosing between the JSP or Thymeleaf templating engine.

As you’re building your application with the RIA starter, keep in mind that you can also make use of the Spring Security functionality that’s built into the framework. This will allow you to easily secure your application with a variety of authentication methods, including authentication with credentials stored in a database, authentication with credentials stored in LDAP, or authentication with a simple username-password login process.

## Mobile Apps with Spring MVC and Java

Building a mobile application with the Spring MVC framework can be done in a couple of different ways.

- You can build the mobile application from scratch using the MVC pattern and writing all the code from scratch.
- You can make use of an existing mobile application framework and build a web application that will be used to interact with the mobile device.

If you are building a mobile application from scratch, then you will want to make use of the “Spring MVC Mobile Application” starter, which is meant for developing applications for Android or iOS devices. This starter will provide the necessary dependencies and configurations for building a standalone mobile application that’s built around the MVC design pattern.

If you are building a mobile application that will be used as a web application, then you will want to make use of the “Spring MVC REST Starter” that’s meant for creating RESTful web services. This starter provides the necessary dependencies and configurations for building web services.

## Conclusion

As you can see, the options for building applications with the Spring MVC framework are nearly limitless. The core of the framework can be used to run a simple application that’s meant for one user, or it can be used to build an application that’s built to scale by being easily deployable and having the ability to handle multiple users and traffic all at once.

There are a multitude of starter templates that can be used to quickly get a project up and running with the necessary dependencies, configurations, and code needed to produce a fully-featured application, whether it be a desktop application or a web application.
