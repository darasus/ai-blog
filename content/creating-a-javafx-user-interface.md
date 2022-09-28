---
title: Creating a JavaFX user interface
createdAt: 2022-07-09T06:24:03.671Z
updatedAt: 2022-07-17T15:00:30.574Z
category: coding
summary: A JavaFX user interface is created from a number of elements. These
  elements are organized into a Scene, which is the root of all JavaFX
  interfaces. The VBox is used as the root node of the Scene, so it has no
  positioning. The layout defines how the controls inside the VBox will be
  positioned, and how large each control will be. The next step is to select a
  control to be used in our JavaFX User Interface. We also learned about the
  advantages of using third-party libraries.
intro: >-
  Almost every application needs a user interface. Applications with no
  user interface appear to be nothing more than programs running in the
  background on your computer.

  It’s impossible to imagine any application that isn’t accessible through some sort of graphical user interface. JavaFX provides ways to build and implement interfaces that are engaging, dynamic, and responsive.

  Even though JavaFX is a very powerful library, it doesn’t provide everything you might need to create a specific type of user interface. You might have noticed this while reading the article about Controls – there were a few controls which didn’t have their own article but were mentioned nonetheless as being part of the javafx-ui-controls module. This means that not all controls are provided by the core JavaFX library (although most of them are).

  If you plan on using JavaFX for your application, then you should know that several modules exist within the scope of this library: ENDENDENDENDENDENDENDENDEND
imageSrc: /articles/creating-a-javafx-user-interface.png
imageSrcBase64: data:image/png;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAQCdASoKAAoAAUAmJZwAAznZC57bgAAA/v6/SWOn0LPOATXrbq/M3lKspwZQmrN6/sKgo/jtmHQ20VNE0UHzrJJMk6WnoH5bad7t43DDhHIcHwEMJEM+LkEOey0AAAA=
---

## Creating a JavaFX User Interface: The Basics

A JavaFX user interface is created from a number of elements. These elements are organized into a Scene, which is the root of all JavaFX user interfaces.
To start with a simple example, we can create a Scene which has a VBox layout, and then place some controls inside the VBox.
A VBox is a container that can contain several items. It arranges those items vertically.
In this case, the VBox is used as the root node of our JavaFX interface. This means that the VBox has no positioning – it’s always placed at the top left corner of the screen by default.
The VBox is bound to the root node of the Scene. This means that if we change anything in the VBox, then that change will be reflected in the root of the Scene.

## Deciding on a Layout

Next, we need to decide on a layout for our controls. The layout defines how the controls inside the VBox will be positioned, and how large each control will be.
The VBox we used as the root node of the Scene is a container, so it doesn’t have a specific layout. Containers don’t have layouts – they simply arrange their child nodes, but without a specific layout.
The VBox is used as the root node because it’s a very flexible control, and will generally work well in most scenarios. However, issues may arise from using the VBox as a root node – if, for example, we decide to add several VBoxes within the interface, then we’ll have a problem.

## Using Controls

The next step is to select a control to be used in our JavaFX User Interface.
There are many controls available in JavaFX, but the core JavaFX library only provides the most basic ones. If you want to use a control that isn’t provided by the core JavaFX library, then you’ll need to import a library.
There are two ways to add a control to an interface. First, we can add it to the VBox, and then we can add the VBox to the Scene.

## Working with Layouts

As we mentioned, the VBox doesn’t have a specific layout. This means that the controls within the VBox will be arranged vertically, and the heights will grow as needed to accommodate the contents.
To create a specific layout, we need to add a FlowPane to the VBox. A FlowPane is a layout which arranges its children horizontally.
This means we can add our controls to the FlowPane, and those controls will be arranged horizontally. We can also specify the width each control should have by binding the width of the control to an integer.
As you can see, a layout can be used in order to define how the controls in the interface should be positioned.

## Adding Visual Effects

Next, we can add visual effects to our JavaFX UI. These effects are used to enhance the user experience, and can be used to create stunning interfaces.
Visual effects in JavaFX are created using the Effects API, which is included in the core JavaFX library.
There are a few effects included in the core JavaFX library, but many more are available as a part of third-party libraries.
Third-party libraries are often used because they provide more effects than the core JavaFX library.

## Wrapping Up

That concludes our article on creating a JavaFX user interface. We went over the basics of creating a scene, and then we explored the various ways to create a UI. We also learned about the advantages of using third-party libraries, and how they can expand the functionality of your JavaFX application. ENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDENDEND
