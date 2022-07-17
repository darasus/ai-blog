---
title: Interfaces in Java
createdAt: 2022-07-09T06:23:17.789Z
updatedAt: 2022-07-17T06:55:46.677Z
category: coding
summary: Interfaces are used to specify an expected behavior of an object. Java
  does not support inheritance for Interfaces. Interfaces define only static
  fields, which belong to the interface and are the same for all instances of
  the same interface. Classes that implement the interfaces will inherit their
  functionality but not their implementation. This means that any code that
  implements an interface can change its implementation as much as it wants, as
  long as it follows the specification of the interface. Using interfaces is
  also a great way to break up your code into small, reusable pieces.
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
