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
imageSrcBase64: data:image/png;base64,UklGRs4CAABXRUJQVlA4IMICAACQDgCdASoyADIAPm0ylUckIyIhKhZqMIANiWUAytWVvDxQBu9k0klB1E+GXeDKvON8KekCxxf7H1Qs3L1V7A/Sg9CAYSebzTvDm4+nWPG0+/b8YkfPz/EwCuO5U6j4tGfTMuMyDKvsfzjMeauI+WeoRgkn9a2AMDDbudAgAAD++u/0Ckxe8sk2dcN9G+nE9g1WVkFyX7N+fvqsZhJavWVaJ6FUvXcBBDPhZ7yGygznCKOMlKAk4lLtv/Fvwb+hTIfyYKiv2G5nDfd+aLZb9GDutaqD8IJ5ln5/66kWXRusZHQu5FJvj6reeSeT98oodpF8lUqlO/J7L0hFZtm/gE++K9j8X1x1TvtvXm8Kvcn+qL4ugRY4WivXtVBtlOqLPj3tbrvTSRX06/n/A6PPg9XHs3Yf/uo6f7egbaTEeZAsWb8cdKFlXjYaOx2/4d7qlRGyhawc0LS/boWTI48j5D+UXlStbZXqD92JL8u9dTLZ+Hpch/R4p7DWrSGXwWclBSucaDu1ZosPS6JXlvCJnqvd8s3Lx5bwXa0NyVu36KxPxyrtfX6bwpKAQhPKbGsb9HAYfdyKDNOF2XKDEPkXBiyw5Ug+BzL/2/Xk/Uuf4gUVYHPgOkbimdaX+O9C5Cmge8gWI6YAGyT2OKnhFFtfeAJ+zZSAv1o6WCdtv8Vtjew+3Jggp1StKhIeMNlS4TT3D5aT5OoMz3x2jFCrmbYieMyWr7b143Djaj3dZCkhAAkHMYuFuPt7fXF55o134ghplhe2hL/MrjO594MyIJEZi86qhewhkFSgCQE2TqZaMtdWpb/TjP76e795Lvu75lnkOvjbV6HzvGBhMSDmL/ao3YlkCNqr7Xr1koM5jNHRb7MkB0vh4Gcrdr49O4ZCWhidn9QPSoNxLwUJt7i2u5IZQfGULwxE+0vh+ouUN7loAMNoAAAA
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
