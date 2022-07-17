---
title: Working with files in Java
createdAt: 2022-07-09T06:23:46.511Z
updatedAt: 2022-07-17T06:56:28.211Z
category: coding
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
