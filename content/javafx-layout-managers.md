---
title: JavaFX layout managers
createdAt: 2022-07-09T06:24:15.185Z
updatedAt: 2022-07-17T06:56:24.277Z
category: coding
summary: The code>VBox/code> is used if you want to show one or more child nodes
  as columns that can grow from left to right, but not from top to bottom. HBox
  or Horizontal Box is a layout manager that arranges all its child nodes
  horizontally in a row and does not allow any child node to grow from right to
  left. GridPane layout manager arranges child nodes in a grid or table
  structure where adjacent positions need to be filled with other nodes and all
  children have equal width and height.
---

## VBox

VBox or Vertical Box is a layout manager that arranges all its child nodes vertically in a column, left to right and does not allow any child node to grow from top to bottom. If you have fewer child nodes than the number of columns, then the VBox will leave the rest of the columns empty. If you have more child nodes than the number of columns, then the extra child nodes are ignored.

If you want to add a VBox to your scene graph, then you need to set its "visible" property to "true" and add layout properties to it. The VBox layout manager arranges all its child nodes vertically. It is similar to putting a bunch of nodes in a vertical stack. Here is an example that uses a VBox layout manager to arrange three buttons vertically.

## HBox

HBox or Horizontal Box is a layout manager that arranges all its child nodes horizontally in a row and does not allow any child node to grow from top to bottom. If you have fewer child nodes than the number of rows, then the HBox will leave the rest of the rows empty. If you have more child nodes than the number of rows, then the extra child nodes are ignored.

If you want to add an HBox to your scene graph, then you need to set its "visible" property to "true" and add layout properties to it. The HBox layout manager arranges all its child nodes horizontally. It is similar to putting a bunch of nodes in a horizontal stack. Here is an example that uses an HBox layout manager to arrange three buttons horizontally.

## GridPane

GridPane is a layout manager that arranges its child nodes in a grid or table structure where adjacent positions need to be filled with other nodes and all children have equal width and height. If there are fewer child nodes than the number of rows or columns in the grid layout, then the extra child nodes are ignored.

If you want to add a GridPane to your scene graph, then you need to set its "visible" property to "true" and add layout properties to it. The GridPane layout manager arranges its child nodes in a grid. It is similar to putting a bunch of nodes in a table. Here is an example that uses a GridPane layout manager to arrange three buttons in a table structure.

## Conclusion

The code>VBox/code> is used if you want to show one or more child nodes as columns that can grow from left to right, but not from top to bottom. The code>HBox/code> is used if you want to show one or more child nodes as horizontal boxes that cannot be larger than their parent node. The code>GridPane/code> is a useful layout manager if you want to arrange your nodes in a grid or table structure where adjacent positions need to be filled with other nodes and all children have equal width and height. In this blog post, we will learn about these three most commonly used layout managers.
