---
title: Building a JavaServer Faces application
createdAt: 2022-07-09T06:25:50.314Z
updatedAt: 2022-07-17T15:00:30.584Z
category: coding
summary: In this tutorial, we will create a simple JavaServer Faces application
  with a single view and a few managed beans. This application will contain a
  form that accepts a user input, and once submitted, the application will
  display the data entered by the user. The data can be stored in JavaBeans-like
  fields and can be manipulated in the same way as regular editors and
  validators. We will also define a simple bean-scoped bean-managed bean-entry
  method and define a view.
intro: >-
  JavaServer Faces (JSF) is an implementation of the standard server-side
  UI component architecture called “Facelets”. This makes JSF a framework that
  uses XML markup instead of code for building and rendering user interfaces.

  A JavaServer Faces application basically is a collection of a views, managed by a controller, stored in an archive file and deployed on a servlet container. Such applications are known as “heavyweight” because there are many different pieces involved to build it.

  As we know, JavaServer Faces technology comes with several built-in tag libraries and default libraries such as standard action message, navigation rule, focus handler, and so on. Each library offers handlers or actions that enable you to use different components in your application. These components can be combined in any way you want to meet your specific requirements. 

  In this article we will go over what you need to get started creating a new JavaServer Faces application project in IntelliJ IDEA
imageSrc: /articles/building-a-javaserver-faces-application.png
imageSrcBase64: data:UklGRsQDAABXRUJQVlA4ILgDAAAQEwCdASoyADIAPm0wk0ekIqGhLBK5mIANiWYAp0ccgC/C+blau1mHFhibebxAPWZ/yWoAegB0xq/+93n8pcQuIriy/xHiWfO/9Nz9eeP6b9gXo3+iaLZQMVrnVLEZIVncS6djcgnG2R+dThYqYTpZX7il4n2QwPDkTm+XoBpR23N4eq4LfYPZywZnb4xxYPMo3/eH1UEBSSC/Qrpc/njp8ADCzVOADH8wCvU40xqOK5g+hRysdztKcyS9ThQWs+1raAXHbKElds2G3vr4d01f/5kp1PKDvE3NQHhBf/67V/omC5u/FRgjiZNc/8SjN5W2qU8JOJ+w+z7tc/5caPBlGAHnfqidO5QLqJMMA+2ItkfDhxR7+O538ULt5grNMq+/r1I0u+os0Ilw5kdJ1TkTij6esgTrlDQgvrJjltstl27+gZ8zH2b7+ka6fnBJRC7LLQwgSm/zTHBeh7U+ajlPLKg3sC5QAJVTbeY9KVNg3c/yzDWFJTgzOUuUeEMK79P/vMLqLuViaAI7oHLWXlP4PaIZklJJSHdMBEsy08T8wWc/E5BNAZk7A4aNz5soUFPpram2tsrxN1e839pqsIXwLlWr17+gHjt+sfk0ctYkhzDGT4fTm84er7XBn1fKilS0n57b8n6Bu8iQeKYQ98tBvP49/N8RSaWrUXRQzzz3M96dFgdkXbWfyXCCH1257564jri98xJc2yK9HYsMVt7vn9D9HAEdR8lMHl1QA7w1YCZHTTuo7KTaX1Y2IPfrX9Oj/5pb4FvLgVLDIcJylaZO81jUvR+2YL5D5H8VzhCfe9Dn13gdLiYPyzCgaLaPGZA9/UQWYhNGDBM8EFemH3ZoqVIKRWR/fc3rhGUAvSqf1ONPbarlpm7jenXG80CZ+EsR7eXFUNPht8yiF/9fE9i+M2Qdkh+wdPCmfPmQY+5o2FI9IvVtJ7YurQe+bl/NWSS9qGPLC4cVADTGRFN2aB6esKVKMe/B9tv5XG3Ab2Cev8C8opE73F+wFbmxVe9Amhw+cGzsTpLu7++ssQnEbeOvhyMJd2st+qVyKgdwuC/h6vVFnsUo+rqQ1I6kAeex31raGbo2Z3ufdfH2ItYNjOrJ0KL4IFmSIN7+SUt7z1vfySfOPM94qpVH8CrAllS/ltG3ggf2Z+Z6TH/JGVqlLmKAYc5eQMOcvIyMmjiay9Rj+JTk1zgvfuFf9UdTvXwW3WmY2VMqhvtV7WAl5BhZZa0XigdYyqv2d5bftTpyPIMrE+oAAATiAAAA;base64,
---

## Creating a New JavaServer Faces Project in IntelliJ IDEA

As we know, to start creating a JavaServer Faces application using IntelliJ, the first thing we need to do is create a new project. To do that, choose File | New | Project from the menu. Then, select the Java category and on the next screen choose the JavaServer Faces category. In the ensuing dialog box, select the Basic (JSF 2.x) option and click Next. On the next screen, specify a suitable Java package, project name, and click Finish to create the project.

For the purpose of this tutorial, we will create a simple JavaServer Faces application with a single view and a few managed beans. This application will contain a form that accepts a user input, and once submitted, the application will display the data entered by the user. ## Set up Java and Gradle

In order to use JavaServer Faces in IntelliJ IDEA, we need to select the Java 9 runtime as the project's default JDK. This can be done in the Project Structure dialog box by adding a new JDK, selecting the desired version from the drop-down list, and clicking OK.

We also need to configure the build tool and source control settings. To do that, open the Settings/Preferences dialog box, select Build, Execution, Deployment | Compilers, and click Java Compiler. From the Java Compiler dialog box, select the desired version, the source folder, and the Target folder. Then, select the Standard JVM Code Path.

Next, select the Gradle version and choose the location of the Gradle wrapper. Finally, enable the Use Source and Target folders option and disable the Show only selected items option. ## Configuring JVM Options

We will configure JVM options to enable the following options: -Xms512m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m -Dsun.java2d.noddraw=false -Dorg.apache.logging.Log=org.apache.logging.log4j.Logger -Dlog4j.logger.org.apache.logging.log4j.LogManager=DEBUG,console -Dlog4j.logger.org.apache.logging.log4j.Logger=WARN,console -Dlog4j.logger.org.eclipse.jdt.core.compiler=WARN,console -Dlog4j.logger.com.intellij.util.logging.InternalLoggerFactory=DEBUG,console -Dorg.eclipse.jdt.core.compiler.source=1.9 -Dorg.eclipse.jdt.core.compiler.target=1.9 -Dorg.eclipse.jdt.core.compiler.misc=true ## Create Facelets Folder and Viewing Template

As JavaServer Faces applications are built with Facelet files, we need to create a new folder named “web” in the root of our project and place the Facelet files there. For creating a new folder in the root of a project, we can use the “File | New | Folder” menu.

We also need to create a template view for our application. In the “web” folder, create another folder named “faces” and place the view there. To create a view for our application, select the “faces” folder and choose “File | New | Other” from the menu. On the dialog box that opens, select JavaServer Faces view from the “Templates” drop-down list and click Next. In the “New JavaServer Faces View” dialog box, type the name of the view and the path where the view is saved. Confirm that the “View Root” field is set to “/”, the “Project” field is set to the current project, and the “View Engine” field is set to “No Engine”. Click Finish to create the template view. ## Define Application Beans and  View-scoped Beans

For the purpose of this tutorial, we will define a simple managed bean with a single properties entry and a method. We will also define a view-scoped bean.

Managed beans are Java classes that are used to handle the data that is passed between the application and the browser. The data can be stored in a JavaBeans-like field and it can be manipulated in the same way as regular JavaBeans are manipulated, using property editors and validators.

To define managed beans, open the view that we created in the previous step and open the “Context” tab. Here, we can define managed beans, set the application's faces context, get the application's faces context, and change the application's faces context. ## Create Activities to Show Conditions and Commit Conclusion

Now that we have set up the basic Facelet template, it is time to add logic. We can do this by creating activities that will show conditions and commit conclusion. We will define an activity to show “New Search” when the user clicks the “New Search” button. Another activity will show “Cancel” when the user clicks “Cancel”.

An activity is a stateless, non-UI-driven, business process that executes outside the context of an HTTP request and is designed to orchestrate business process logic and/or utilize other services.

In order to do this, open the view that we created earlier, choose the “Controls” tab, and choose “Insert View”. Select the “Activities” tab and select “New JavaServer Faces Activity”. In the “New JavaServer Faces Activity” dialog box, enter the name of the activity and select the method to trigger the activity. Click Finish to create the activity. ## Conclusion

In this article, we went through what you need to get started creating a new JavaServer Faces application project in IntelliJ IDEA. We also discussed how to create Facelets, define managed beans, create activities, and concluded with a discussion about activities.
