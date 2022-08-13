---
title: Inheritance in Java
createdAt: 2022-07-09T06:23:04.733Z
updatedAt: 2022-07-17T15:00:30.559Z
category: coding
summary: Inheritance is the process of taking one class and making it so that it
  extends the functionality of another. This means that the code that was
  implemented in the parent class can be used in the child class. This way,
  you’ll have a single point of code where that functionality is defined and you
  can reuse it as many times as you want. If you want to reuse code that has
  been implemented in a different class, then you should use inheritance. This
  is just one of the reasons why you might want to take advantage of
  inheritance.
intro: >-
  When you think of classes and objects, what comes to mind? If your
  thoughts immediately went to the idea of parent and child classes, then you’ve
  either studied object-oriented programming or you understand the nuances of
  English. However, if you think about a parent giving birth to a child, then
  you obviously haven’t studied enough OOP. Let’s see what inheritance in Java
  is all about and why it’s useful. 

  We often find ourselves reusing code that has been implemented in some other class. This leads us to ask a very logical question – can we reuse code even further? The answer is yes! We can take one class and make it so that it extends the functionality of another. This is called inheritance in Java. It is one of the cornerstones of OOP programming and something that every serious programmer should know well.
imageSrc: /articles/inheritance-in-java.png
imageSrcBase64: data:UklGRiwEAABXRUJQVlA4ICAEAADwFgCdASoyADIAPm0ukkWkIqGWDAbMQAbEsQBmKtdHbs+hOOuz9B/APd1zbfQi5oX9sdYp/mHqn/qB1rVdZ/OfxJ6yXylIZo8/tOcm/s35AcL/xv+jf5/wFtSDuX6Ef5v/hPzA5sOYp/Wf+B/YPYn/x/Lv9JewP/K/6v/wuBu/YAgeLHz+rtbaNhaX0zfZNqPkwiuikIgQEjNVq9ELaL+Z8CFzpJ8YOifVD0aBuRVF782AW152AsBWUwmzFy8k4AAA/v6suGmnU+mQAVipm6Kd2xVKmorb4nTcc4OsD3/EUhAXOsyWGoQLjNCcetrkOnqqIDjY/OK97EeWA7L9P8OU5uf60Ib2UGXR18ZyP6pCYgeaXsdj87r0bSiHTgv/2Yh/w7n+52Rtb6+/8QrgINetSrJ8U1m4gUjxfiNOyzIbzf+VdlPqgbX/0ref/HrULnC3y1pP8ajfRQH3TjYbM1OHdfowrNgPDjzYa6uHNZfT3+9BP/eNyKcCf+2gZUyjHfHcXFULL8onjTsb8KW3zMMwLfLjDeKh/tT5sxfGQfznCnFwKDJjxp+5/9REiEvt4xFgc2j2xLhz4dn/dTsKCL7WP1T1bQxfe/ypJaT1m6vtT+oq/RiFxo6cRfwX9nToDja2fux+ZD+YE0OTYH21ov7DN9T3R+a9DcihcjTseES0bbLT9BJdU2DppGXrx+DVpPWAA6G1CiQCyB6Pf81/pv39vCNZSFQQMC1nvjoy/3+/2h97QmTNvd9jKQJ//9q/eEeip6a/ma/37pRnSmh80hToft1Xyw98UKWfvowe4lXB0++4ZTrxhZIU7dHSbj22wIhnsIgB4rOKVIo7aC+Txfc4twdxvt+KesDZPHXn77l6vVP9HEAez4njZMaHOnmJAxRSSbayDv6VcPr5SB34KlijhwKbRno2APaQLBej6KXsAykFoeW0XwL2F8hH5E1JvCeD2J5/Qt6nZVaCgpoEwM+j1SzGY8p2eQryRforPYnqUwzUquKQECXSTEHH2GNvdDhJ0GnoNmpUaGFyaG7/ppabbv0lgOa6d+ATxmFtmKJHYeMRRBVe9W1Br3mvB2qtqo+VN6vCnP9iNVin1YaP0p8+Z4mSKNwFma1EWD7iRNtdoZuwZqOrZP1VFCuRxOOY5fwdJA1j/OhB/0xj8mLVrbmEek+7JPL+iXRlcMkNoru9b5Tru6tS4q8Eih/fd2nmpQdflWavROxBA+6ngtgCvfhE6VvY1zh7Tv2e5JwCRwB7Rqkb0ZZu9jF1aX51ELbLE3TjDGBUuNT9aY10lumDxqGpdwAGmkPiRUhjp2RZig864e0b5zrh7RdvoDyxL772cr5xKKGXYyvuKWbfaLb7rr66ze32MOSRSFQjndGCCNqXhoN9uB3R8j40HD8aPCiVoAA=;base64,
---

## Why Use Inheritance?

It is important to understand why inheritance is used at all. If you want to reuse existing code, you can always do so without inheriting anything. However, the problem is that if two different classes need the same functionality, you’ll have to copy and paste that code in two different places. This is a bad practice and can lead to issues in the future.
The only way to avoid this is to use inheritance. You can create a base class that has all the shared functionality and then have all the child classes extend that base class. This way, you’ll have a single point of code where that functionality is defined and you can reuse it as many times as you want.

## What is Inheritance in Java?

Inheritance is the process of taking one class and making it so that it extends the functionality of another. This means that the child class can use the parent class and vice versa.
This means that the code that was implemented in the parent class can be used in the child class.
In the end, this allows the creation of a “family tree” of classes, where a child class can extend a parent class and inherit all of its functionality.

## When to Use Inheritance?

If you want to reuse code that has been implemented in a different class, then you should use inheritance.
However, this is just one of the reasons why you might want to take advantage of inheritance.
Now that you know what inheritance is and why it’s used, it’s time to learn when to use it.

- Code Reuse - When you have a parent class that has all the functionality that you need in your child class, you can inherit from it. This way, you’ll have a single point of code where that functionality is defined and you can reuse it as many times as you want.

- Extending Existing Code - What if you have a parent class that has all the functionality that you need, but it isn’t quite what you’re looking for? In this case, you can inherit from it and then change or extend that code. This way, you’ll have the best of both worlds. You’ll get the functionality that you need from the parent class and the ability to make modifications to it.

- Extendability - Inheritance is useful for more than just reusing code. It can also help you with your code’s extendability. This refers to the flexibility of extending a class to add new functionality later on. In other words, you can add functionality to an existing class by creating a new class that inherits from it.

## Java Built-in Types that can be used as Constant

This is a list of the most common types that can be used as primitive constants.

- Boolean - This is the type that is used to represent true or false values.

- Character - This type is used to represent one-letter strings.

- Integer - This is the most common type used to represent whole numbers without decimals.

- Long - This type is used to represent long numbers without decimals.

- Float - This type is used to represent numbers with decimals.

- Double - This is similar to float, but it has a slightly higher precision.

- String - This type is used to represent strings of characters.

## Conclusion

Now you know the basics of inheritance, when and why you should use it. You’ve also learned what types can be used as constants and how inheritance can help you create extendable code.
Of course, there’s more to inheritance than what’s been covered in this article. However, if you understand the basics, you’ll be able to grasp the rest of it easily.
