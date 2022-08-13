---
title: Working with files in Java
createdAt: 2022-07-09T06:23:46.511Z
updatedAt: 2022-07-17T15:00:30.568Z
category: coding
summary: The “New” command creates an empty file for you. If you want to create
  a file and fill it with some data, you can do so with the “Append” function.
  You can also update an existing file with a new version of itself, e.g.
  “example.txt” If the file is a “system file”, it cannot be deleted. The syntax
  for this is “reconstructing’s” and “dealing’ing files is the same syntax.
intro: >-
  Working with files is something that entry-level programmers don’t get to
  do very often. It’s not the most exciting part of software development, but
  it’s an important one. The file system is the cornerstone of almost every
  program you use on your computer. Working with files in Java can seem a little
  counterintuitive at first. Once you understand what makes it different from
  other programming languages, it becomes much clearer. 

  Working with files in Java involves creating, reading, updating and deleting files. Files are stored as strings or bytes. If you have used other programming languages before, this will be familiar to you. In Java, there are two separate ways of working with files: standard streams and the new "File" class introduced in version 1.1 of the language. This article explains how to work with files using both methods and also touches on some related topics such New>.../New> tags and Jar archives (self-executable packages).
imageSrc: /articles/working-with-files-in-java.png
imageSrcBase64: data:UklGRpoCAABXRUJQVlA4II4CAAAQDgCdASoyADIAPm0ulEakIiIhLBVbMIANiWgBOgKnWO8w/o/4x/jBkJsY/WBtgPMB+y3Tgb5hz63sj+Vu0QTLbvPS0NY9qADQVZMSL2GhcFP//wFNIVer2NsU+9lMsUCu8Ya37WEmC2Ve8fenX3gH4dD0Po3UCDWAAP64kPBzh6VzIwbtsTWu5bV9cg3Pt5xA/TFwK26JUn//TOd98n5Gfcrs/6PsWnNL/++fS1S255J498CMYW9lf31/+BSUVSINfYi/XtHTgyjx8/0dHJt0PQI5l6+3n34Tzgik+yCkOoO0VuzP794p0WOsmv3VH/NcIgSZUEElI4kkPZq5UxXSz7utHYH8VAuIQzK7+/19c3g4dd/STWrKn+0b/znMmhpP9dPvZOvAfh0U5YYW7J8hHupKn8kH6pM8/+ID5/+ammGgZWRINNN9BrQvyCZdEA68u0BCl6g05y+dgYsoVbwORT2iuoVoi/Uu0p4ya84/2Zqob3h3vV/haLo9cuTASW4ZOxwMZq6OL0zk2BIsb7C5zL2W/NSuN4CH7liPVCjETZAM1PpwjM0XwSjJBfW8Hg7nJU2h0VuD/BfHtuLskbzaZQw5PaxI+JBX8oRWermJyFdWtLXh0RH8XHyOHtbDLGqTse+6QPtmW/XGvkxwDThlm9di4iO1xfxIyuRDI8aQ/nC8TVwJNwljGJkk4R6eOEDYT1stE0V4X5OOqT5TpWz4iKRh6OLM05TXeF2d5fG+nh3a2z1tiV631mW/H8JgDWOi4fCnM9C5dhUUf5uf/4PyCG+/wS4Z2645imTBTcmJj5Y99cg3dcArESv4Og0gqdba5gZcPwj+kOLpoalcvY9IV//RPnwAN3oUytwAAAA=;base64,
---

## Create and Read Files

Before you can write to a file, you need to create it. The simplest way to do this is with the “New” command.

file = New>.../New>

Here, file is the variable that will reference the file in future. This can be any string that makes sense to you, e.g. “example.txt”. You can also assign a file path like this:

file = New> C:/Users/Username/Desktop/example.txt

The “New” command creates an empty file for you. If you want to create a file and fill it with some data, you can do so with the “Append” function.

## Updating Files

If you want to add more data to an existing file, you can use the “Write” function. The syntax for this is

file.Write(String data)

where “data” is the information you want to append.

You can also update an existing file with a new version of itself, e.g. “example.txt” with new information. To do this, you will need to read the old file’s contents into a string and then write that data back to the file.

## Deleting Files

You can delete a file with the “Delete” function. Here’s how it works

file.Delete()

This will remove a file if it’s empty, or if it contains data, it will be marked for deletion. If the file is a “system file”, it cannot be deleted. Here’s a list of the files that cannot be deleted:

- AppData/Oracle/Oracle_javavm_log/logging.properties

- AppData/Oracle/javavm/logging.properties

- AppData/Oracle/jvm.log

- Boot/vmlinuz*

- Boot/vmlinuz-*

- Boot/vmlinu*

- Boot/vmlinu-*

- Boot/vmlinuz.old

- Boot/vmlinuz.bak

- Core/core-*.log

- Core/*.log

- Core/*.lgc

- Core/hs_err_pid*

- Core/hs_err_*

- Core/hs_err_*

- Core/hs_err_pid*

- Core/System*

- Core/System.log

- Core/System.lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/ui_log

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerHolder/*.lgc

- Core/System/ui_lgc

- Core/System/LoggerHolder.log

- Core/System/LoggerHolder/*.log

- Core/System/LoggerH
