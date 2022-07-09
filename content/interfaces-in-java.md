---
title: Interfaces in Java
createdAt: 2022-07-09T06:23:17.789Z
updatedAt: 2022-07-09T06:23:17.789Z
category: coding
---

In Java, an interface is a reference type, similar to a class, that can contain only constants, method signatures, and nested types. Interfaces cannot be instantiated, but they can be implemented by classes or extended by other interfaces.

When a class implements an interface, it must provide an implementation for all of the interface's methods. If an interface extends another interface, it must provide an implementation for all of the inherited methods.

Interfaces are useful for:

Declaring methods that one or more classes are expected to implement.

Capturing similarities between unrelated classes without forcing a class relationship. For example, the Comparable interface captures the functionality of classes that can be compared to each other.

Providing a layer of abstraction between a class and its clients.

Creating a service provider interface.

An interface is declared with the interface keyword. It can include constants, methods signatures, and nested types. An interface cannot contain instance fields or methods with implementation (i.e., non-abstract methods).

All interface methods are implicitly public and abstract, even if they are not explicitly declared as such. All fields in an interface are also implicitly public, static, and final. An interface cannot be instantiated, but it can be implemented by any class or extended by another interface.

A class that implements an interface must provide an implementation for all of the interface's methods. A class can implement multiple interfaces, but it can extend only one class. An interface can extend multiple interfaces.

When a class implements an interface, it is said to be "implementing" the interface. When an interface extends another interface, it is said to be "inheriting" the interface.
