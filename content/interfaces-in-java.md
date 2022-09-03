---
title: Interfaces in Java
createdAt: 2022-07-09T06:23:17.789Z
updatedAt: 2022-07-17T15:00:30.560Z
category: coding
summary: Interfaces are used to specify an expected behavior of an object. Java
  does not support inheritance for Interfaces. Interfaces define only static
  fields, which belong to the interface and are the same for all instances of
  the same interface. Classes that implement the interfaces will inherit their
  functionality but not their implementation. This means that any code that
  implements an interface can change its implementation as much as it wants, as
  long as it follows the specification of the interface. Using interfaces is
  also a great way to break up your code into small, reusable pieces.
intro: >-
  The definition of an interface is almost the same in Java as in any other
  object-oriented programming (OOP) language. An interface, strictly speaking,
  is a type that specifies a set of methods, but not their implementation. This
  means that an interface can have static methods and accessible properties but
  no instance methods or fields.

  An interface is a type that specifies only the behavior and not the implementation of an operation. The classes implementing this interface must provide their own implementation for every method declared in it. Interfaces are used extensively in Java to provide a common ground for classes to implement some functionality without revealing the internal implementation details.

  When we use interfaces, we are creating contracts between our classes that they will behave in a certain way—that they will implement certain methods and perform particular tasks when called upon to do so. Let us explore how we can leverage interfaces in our code to make it more modular, reusable, testable and readable.
imageSrc: /articles/interfaces-in-java.png
imageSrcBase64: data:UklGRh4EAABXRUJQVlA4IBIEAABwFgCdASoyADIAPm0skkYkIqGhLhkriIANiWwAx2PkAX+yfi7+JPylV7+1/hL8VeaRLp1kfp/uA9/f6Ae6DxL+kZ5gP2x9Y7/Qf1X2S+gB/XOoe9ADyyfY1/t//I/cD2oKQNjEuEE0Xqmxl/kD+nvYJ/Wj0gPXl6DpTrM8y+7RYqmC9VDeRO1pYykoglPI9Jpnx1+IADEoah9bYHlGFHq11CcRFHLhw5tIPs13X3cgt01W+N41k5OQl8TjAAD+83DFTt4kgFJYIEn5a1k8ZZw2i1eh+HG47HDXQG8+R70IPop3Mrn5hKAhf/w/gnVnztuG+gHJ//3wuPqdxtpoXhNvCid6/MAjLU5hGbf0KGMAWAhj1VjieBE2AIZYsS1IUFjwbwHZGSx2d3R9SXIJ/6wFrvFoqfnU3c6mJCF7KrecVOQIyMc68f0aZTLh1tH0lWfhKjjhpTauAEUNeaWb9L7RqXcftrLaM8YSuCppLa9VWpF1L3mS/Db15/Z9itRbQpCQZwbXlUjNYLdtJgNlt6+5kINPVv8EtML9YFJew6Of6/eo11zgSaXbDtfSyPn+QI4q/UGYZoCBmHryIQ3wVeRyMoYV8ate2JefBKf4VKx4vxArhgl1e6jWPuB9j52GMI7OT1VN1sWXv0pXuC1+hF2kCsPke+Vl94oTTXh99aCTvYOKnzNP9F7kPjo25Bf+/574XJ/j1nw8LrG73sRuLgYgzmbKSC/oDtDvleo3WIOfHefgcR4ZaN25yZ2D7/5X/P2R//8ZdKydnds7Z5ZX0KkvexAsU6OTNavYjA3t4i+WcngY2NkHoxFYAUPH/iZWIquYwjets1vlrEhlGuqZte9UKx2B+rEwKdeCRznzFzsaj53PNppvazqC/x1M7kipDae4izYhSHyxLE8YVuVyWEv6IpT8HEIful664aXf3m00XESXaBMOGbrLL2zL/QHeQPvEfHkjW3Ogce/LLmRJ1zj5yk/NH0ewU6kQu5MabDY3fx1oJiAMV4gfC5TwObgtMM/TDZRMC6B2Hu8v5Pd7xfAFDn7EqxsG0U9DANiU3qzPGTq0pyDWm0qgWMaQGnKpPYHWWhpMvqhXBOR1Q1yWgCg3/d4fFYPmePJW4BOXD3feulWf82k3N0TNvkM1nQsQt6mRTNG2zR1R55jUjPDxwSh37qc2c8VIlpCgb8zMXYiiWEaZNA6P2xxpSk873NUzMIwj97QxXKYrkiietERC5wIxexdIf5VyLPwyye8eZaExd71UlMw9yHsoXLOB10PaQukJhtbFeFj4K6t91rAyvp4kJ2Wg5RZaDkyWCshUYH44081UAdx34Fy+JKPVGX/4+REuOdo+5o9DAaogvc8+zaJZH+R984onM5BlOJplkAAAAAAA;base64,
---

## Why use interfaces?

Interfaces are used to specify an expected behavior of an object. This is particularly important in large systems where many different developers are creating code that works with one or more classes. By using interfaces, we can make sure that every class that is actually part of our system will have a certain set of functionality that it provides. The clients of those systems can then write their code against the interface and not be concerned if the actual code changes slightly (or completely). This is one of the major reasons that interfaces are used in Java.

Using interfaces is also a great way to break up your code into small, reusable pieces that can be easily tested. If you have a class that you want to break apart into smaller pieces but you don’t want to necessarily change the signature of how it is used in another class, you can create an interface and then have it implemented by the pieces that make up the original class.

## Instance vs. Static methods in an interface

The methods declared in an interface are not instance methods, but static methods. Every object of the class that implements the interface will have its own set of instance methods. However, all the static methods defined in the interface will be available for all the instances of the implementing classes. Instance methods are always specific to a particular object, while static methods are not.

Interfaces cannot define instance fields. Instance fields belong to the object and can differ among different instances of the same class. Interfaces define only static fields, which belong to the interface and are the same for all instances of the same interface.

## The same thing with different words

A class that implements an interface is like a car that has four wheels. A car can have any sort of wheels, but they need to be the same type. All cars with those specific wheels will have the same size, shape, and function. All the implementing classes will have the same methods with the same functionality and parameters. The implementing classes can have whatever functionality they need to get the job done, but they must have the same functionality and parameters as specified in the interface.

## Defining an interface

The syntax for defining an interface is simple. You give it a name followed by a set of curly braces containing a list of methods with no implementation whatsoever. Here’s a simple example:

The interface can then be implemented by any class that needs to follow its specification. The syntax for this is also straightforward:

## Java does not support inheritance for Interfaces

Unlike other object-oriented programming languages, interfaces in Java do not support inheritance. And you should not expect them to do so. Inheritance is useful when one class is more special than another. For example, an Animal class is more special than a Dog class, so we can inherit from the Animal class. All the functionality of the Animal class is available to the Dog class. The same is not the case with interfaces. Both the Animal and Dog classes will have their own methods.

The classes that implement the interfaces will inherit their functionality but not their implementation. That means that if the Animal class has a method that accepts an int parameter, then both the Dog and Animal classes will have that method. However, the Dog class will still use an int for its parameter. The reason for this is that a class can implement only one interface.

## How to write usable interfaces?

Writing a good interface is like baking a cake. You want to add only the ingredients that are necessary to get the desired output. It’s important to keep your interfaces as minimal as possible. You don’t want to over-complicate your interfaces, as that can make it harder for other developers to understand how the interface can be used in their code.

Now that you understand what an interface is and why they are important, let’s look at some examples of interfaces. First, let’s take a look at the java.util.List interface.

This is a pretty simple interface that specifies that any class that implements it will have a function called add, remove, and get that takes an int parameter as input. The java.util.Collection interface is more complex but also more meaningful.

This interface specifies that the implementing class should have a function called isEmpty that returns a boolean and a function for finding the maximum value in the list.

## Conclusion

Interfaces are a very useful tool in Java that allows code to be more reusable and decoupled. It’s important to understand that interfaces can only describe the behavior of a piece of code, not its implementation. This means that any code that implements an interface can change its implementation as much as it wants, as long as it still follows the specification of the interface.

This makes interfaces a great way to make code more decoupled and reusable, but it can also make it confusing if you don’t understand how they work. Once you get the idea behind interfaces, you’ll see how useful they are and how you can use them in almost any piece of code that you write.
