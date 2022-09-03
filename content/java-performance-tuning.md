---
title: Java performance tuning
createdAt: 2022-07-09T06:27:22.065Z
updatedAt: 2022-07-17T15:00:30.613Z
category: coding
summary: You should measure your application’s performance before tuning the
  JVM. The first thing we’ll discuss when it comes to tuning is heap size.
  Caching bytecode for your entire app can cause issues if two or more different
  classes need to be compiled at the same time. Adding fast-path code to your
  Java code can help improve performance by eliminating the overhead of creating
  a new thread for every call it’�s created. Use API'path code in Java code that
  will be used often, and others will only be used occasionally.
intro: >-
  In the first article of this series, we discussed how Java performance
  tuning can be complicated. The different factors that impact performance, and
  how you can measure them. In this article, we’ll go over the specific
  strategies for tuning your Java applications to get better performance. There
  are many moving parts in a Java virtual machine and a variety of things that
  can negatively impact performance. 

  We’ll discuss a few specific techniques and configurations you can use to tune your JVM for improved performance. This includes heap size, code caching, compiler options, code usage, and interpreter mode. Read on to learn more about these concepts and their implications on your application’s performance.
imageSrc: /articles/java-performance-tuning.png
imageSrcBase64: data:UklGRqgCAABXRUJQVlA4IJwCAABQDACdASoyADIAPm0wk0YkIyGhLBqrMIANiWUA0GN6rSsvYl8oyKtGGFq3dBjL9CHtA9vuoSQeuNyctljGHzrabglUVlsq8qv8sEPnCm8PsE5UtT1n4zLKBVRl+4qaiq9+WMqXdPc5B81UAAD+9uu9RSQbyFkU73ibR8g1tpw/8aAP50tZKxCh0AfoBauT/Byfzfb9t7rw6W+LxHvxZs1XfB1//l//e6mGpxrPTbp+D62ABYoWUNYXdqFz1j+t2r0aFA58bnWK5ZDuw/d7kfMQsoTjXdYl6wNwUrQaXO/Nz5V0CP9ZTbNLl+k/4yc7k4eObEjQroL4mRpgzXFv0E8YyGxsKkMU9QSFz0WWehl55/uJyDbLEjo7fYq6HT6JYHT3x+uABCJTsHvKZVeAXI06i6qxEMKwebAM/Hwlh7If4/2ChFxKFozPaq0D3VLKZLUyF2yx40tzDM6hPCgR9CIMN97Pbl2UTjiucj6V1LhRLqIt/9Wg30ZKMcxyoyDqwiQvLWVBmy37ydyBv4Ozg+taZGq2hetWcBK7bhmE9OzNjfCpWLs+ZXMpikQgk9qw3q1Qa0H+QRwCT8wGi9y7PNqPJ44gIdpkp9TLE76Y4T9PMl/fa8/iM2oM9bctS1GASWgm6+1wT2xoGa8Xpbusej5KmzEyK/A9h0suhc8saD2zUVeohLei/GpQzNnQR9Y+2M/w6SPOdYyWq29/+PeuPGJgIv8a7Btj9Ex6jcgYprpfDRmnebx/vbE0D3snFBNoQj7OUMTPE4+1ifXFoygGbqaHUoFcp2fLS5vwqDZAnZauDFys4v/u0Uwv4pakKBj6GwIo/036Vjk47pteh+3MQYiIdFFw9kQvWMn4Hmq7gQf/Wvt3BXfivIQhIAAAAA==;base64,
---

## Measure Before You Tune

Before you dive into tuning, you should make sure you’ve taken the time to measure your application’s performance. This is especially the case if you’re experiencing performance issues. You don’t want to start making changes to your JVM that could negatively impact your application’s performance and then not know what caused it. Taking the time to set up a baseline will help you identify changes and draw conclusions as to what made a difference.

You can use a variety of tools to measure your app’s performance. You can use the built-in profilers that are included with your JVM. There are also a number of open-source tools that can help you measure your performance and provide insights into bottlenecks.

## JVM heap size and platform performance

The first thing we’ll discuss when it comes to tuning the JVM is heap size. The heap is the space that the JVM uses to store objects. As your program is running, it’ll create new objects and release old ones. These objects are stored in the heap. The JVM is responsible for deciding when to create new heaps and how large to make them.

Most of the time, this process works well. But if your heap size is too small or your system is under heavy load, the JVM can’t keep up and performance will suffer. When your application is experiencing poor performance and you notice that the JVM is using a lot of processor time and taking a long time to complete tasks, increasing your heap size may help.

## Code caching

One of the first steps in Java performance tuning is to look at how you use code caching. Code caching is when you cache sections of code and don’t re-compile them each time they’re needed. This is generally a good thing, but it can cause issues with your app if you’re not careful. Code caching can also be referred to as bytecode caching. It’s important to note that code caching isn’t specific to the JVM. It’s a common practice used in all programming languages. When you compile your app, you can load the bytecode into your JVM and then cache it. This means that the next time that particular code is run, the bytecode is already loaded and doesn’t have to be compiled again. This saves a lot of time when running your application.

But there are ways to go about code caching that can cause issues. One common mistake is caching the bytecode for your entire app. Caching bytecode for your entire app can cause issues if two or more different classes need to be compiled at the same time. This is because only one compiler can be used at a time. If another class is being compiled, the bytecode for the rest of the app is cached and isn’t available for the other classes. If you cache the bytecode for your entire app, it can cause performance issues and make debugging harder.

## Java compiler options

When you’re writing Java code, there are compiler options you can use to change the way your code is compiled. These compiler options can vary from platform to platform and from compiler to compiler. But they can have a big impact on the performance of your Java application. There are two compiler options that have a significant impact on performance. These are the -Xss and -Xmx options. -Xss : This option controls the amount of memory allocated to the thread-safety stack. The thread-safety stack is used during the thread execution to ensure that thread interactions are safe and don’t cause issues for other threads in the JVM. If you set the value for this option too low, you may run into issues with the JVM throwing out of memory exceptions. If you set it too high, you may increase your JVM’s overhead.

-Xmx : This option controls how much memory the JVM can use. If you set this value too low, you’ll run into issues with the JVM throwing out of memory exceptions. If you set it too high, you’ll increase your JVM’s overhead.

## Use API’s with fast-path code in them

There are parts of your Java code that will be used often, and there are others that will only be used occasionally. If you have an API call that’s used often, you may be able to speed it up by adding fast-path code.
If you’re using a Java API and it’s creating a new thread for every call, it’s not using fast-path code and it can have a negative impact on your application’s performance. Adding fast-path code to these API calls can help improve performance by eliminating the overhead of creating a new thread for every call. You can add fast-path code by using the Java code-generation tools or by using a platform-specific API.

## Use interpreter mode to check for bottlenecks

Interpreter mode is a handy feature of the JVM that you can use to check for common bottlenecks. To use interpreter mode, you can add the "-Xinterpreter" flag to your JVM. When you use interpreter mode, the JVM doesn’t translate your bytecode into machine language. It keeps your application in the Java language and instead uses a single thread to run your application. This allows you to see if there are any bottlenecks in your application that are caused by the JVM itself.
Interpreter mode can also help identify slow API calls and any issues with code caching.

## Conclusion

In the first article of this series, we discussed how Java performance tuning can be complicated. The different factors that impact performance, and how you can measure them. In this article, we’ll go over the specific strategies for tuning your Java applications to get better performance. There are many moving parts in a Java virtual machine and a variety of things that can negatively impact performance. 
We’ll discuss a few specific techniques and configurations you can use to tune your JVM for improved performance. This includes heap size, code caching, compiler options, code usage, and interpreter mode. Read on to learn more about these concepts and their implications on your application’s performance. 
Now that you’re more familiar with these concepts, you can use them to better optimize your Java applications and improve their performance.
