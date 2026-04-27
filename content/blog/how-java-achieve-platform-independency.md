---
title: "How Java achieve Platform Independency"
slug: "how-java-achieve-platform-independency"
date: "2020-03-17"
excerpt: "Hola Readers! Welcome back after a lengthy break. Hope you missed my writing. 🤗"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/java-platform-independency-2dddd92a53f8"
featured: false
readingTime: 6
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/how-java-achieve-platform-independency.png"
---

Hola Readers! Welcome back after a lengthy break. Hope you missed my writing. 🤗

I was writing a lengthy article regarding [JVM](https://medium.com/@phantomgrin/jvm-101-introduction-classloader-sub-system-jit-compiler-part-1-9e5a6782fa3e) today (expect to publish it really soon). But before talking about the JVM and its internal processes, I thought I should start our discussion by talking about what is Java and why it is so important as a programming language, so that, you can understand the role of JVM in making the Java stand out from the rest of the programming languages.

This article will be a comparatively smaller one where we discuss:

1. Important features of Java (briefly)
2. Compilation vs Interpretation
3. How java achieve platform independence

Without further due, let’s dive right in! 💪🏽

### Important features of Java

1. ***General Purpose***: Not constrained to one domain and have a vast variety of applications like web applications, standalone applications, mobile applications, etc.
2. ***Object-Oriented***: Help to model real-world objects and entities into the program code.
3. ***Platform-Independent***: Write-Once-Run-Anywhere (WORA) regardless of the Operating System or Architecture (32 bit/64 bit) → This is the feature we are going to discuss in-depth 🤓
4. ***Concurrent***: Capable of multi-threading
5. ***Very Fast***: As a result of the compact, optimized and compiled bytecode, and JIT compiler
6. ***Robustness***: Ensured by the Bytecode verifier
7. ***Support for multiple languages***: Languages like Scalar, Ruby can be compiled into valid Bytecode, hence can be executed by the JVM.

[**My favorite free courses to learn Java in depth**
*My list of free courses to learn Java in depth from Core Java to Multithreading to JDBC to Collection, everything is…*medium.com](https://medium.com/javarevisited/10-free-courses-to-learn-java-in-2019-22d1f33a3915 "https://medium.com/javarevisited/10-free-courses-to-learn-java-in-2019-22d1f33a3915")

### Compilation vs Interpretation

Machines understand only 1s and 0s. However, for a normal human being, it is not easy to write complex programs in 1s and 0s. Therefore, people invented a language called Assembly language. Even the assembly language is not much of an expressive language, hence, more English-like languages were introduced later on.

Machine and Assembly languages are classified as Low-level languages while more English-like languages (Fortron, C, C++, etc.) were classified as High-level languages. All languages, except for the Machine Language (i.e. 1s and 0s) require a mechanism to convert them to Machine-understandable instructions.

For Assembly Language, a converter called Assembler was used. (we don’t discuss it here). For all the High-level languages, either a Compiler or an Interpreter was used.

However, the compilation process and the interpretation process differ a lot from each other. The compilation is done on the program as a whole and machine code is generated from the source code, which was later executed by the CPU to get the work done.

Good examples of this are C and C++. On the other hand, interpretation happens line by line, and directly execute the source code, like in the case of scripting languages like javascript, python, etc.

[![](https://cdn-images-1.medium.com/max/800/1*UktcQ_sqxiFJWAA2teSWAw.png)](https://medium.com/swlh/10-things-java-developer-should-learn-in-2019-5e0cf388e07f)

Compiler vs Interpreter

The important thing to note here is that the source code is platform-independent while the machine code is not, as machine code is created specifically to the operating system of the execution machine to support OS libraries and various optimizations that are in-place. Therefore, the Compilation process is considered a platform-dependent task while interpretation is platform-independent.

On the other hand, Interpretation is relatively slow because of reasons like constant access to memory (as no registers involved like in the case of compilation), source code getting re-interpreted each time it is run, etc.

The execution in the compilation process is faster compared to interpretation because the machine code that was generated is pre-compiled, optimized and compact beforehand to running the program. Another consideration regarding interpretation is security because of the line by line execution mechanism. Also, the interpreter needs to be loaded to the memory along with the program, hence occupies certain memory as well.

On a nut-shell, both compilation and interpretation processes have their own pros and cons. When the first requirement arose in Sun Microsystems (now acquired by Oracle) to make programs that can run on various connected embedded systems, the main considerations they came across were platform independence and performance, along with memory limitations of embedded systems. Both the compilation and interpretation processes failed to impress the Green Team who were working on the matter. Hence, Java (previously Oak) was born, in 1996.

### How Java achieve Platform Independency

[![](https://cdn-images-1.medium.com/max/800/1*7PJZxugZyqgRu6ppy3Md-g.png)](http://www.java67.com/2012/08/how-java-achieves-platform-independence.html)

How Java achieve Platform Independency

Java sort of combine the two processes of compilation and interpretation, keeping the best of both. Similar to the traditional compilation process, Java also compiles its program. But not into machine code, but into something unique to Java called Bytecode.

Bytecode is something very special to Java. It gives most of the advantages that the machine code gives, like fast execution (because of the compact, pre-compiled and optimized nature). It also can be transferred quickly across a network, making Java, a language that can create highly portable programs.

Unlike the machine code, Bytecode is platform-independent, hence does not have any OS-specific stuff. So how can the computer, or rather the Operating System, understand the Bytecode? 🙄 It is thanks to the ***JVM*** or the [***Java Virtual Machine***](https://medium.com/@phantomgrin/jvm-101-introduction-classloader-sub-system-jit-compiler-part-1-9e5a6782fa3e).

[**Top 5 Courses to learn JVM Internals, Memory Management and Performance Tuning in Java**
*For a senior Java developer, it's essential to know how JVM works and how to troubleshoot issues with respect to…*javarevisited.blogspot.com](https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html "https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html")

Java Virtual Machine is an abstract, platform-dependent virtual machine that is capable of executing the Bytecode. It has its own mechanisms to deal with the Operating System that it is talking with. Hence the platform-independent Bytecode together with platform-dependent JVM, guarantee the platform-independency of the Java programs.

With that, I will conclude this article. Today we talked about the key feature of Java, “Platform Independence”, and how Java had achieved it. I hope you enjoyed reading it as much as I enjoyed writing it. 🙈

As always, comments and criticisms are warmly welcome. 🤗 I hope I added something to your knowledge. Until the next post (expect it to be out soon, talking about JVM which we briefly discussed here),

Happy Reading!! ❤️

Also, be healthy and precautious (wherever you are from) as we are facing a global health crisis, because of Corona Virus. 😷 Hope you and your families are all safe. Wash hands. Avoid the crowd. Stay Blessed… 😇❤️

Other **Useful Resources for learning Java** you may like
[10 Things Java Programmer Should Learn in 2020](https://javarevisited.blogspot.com/2017/12/10-things-java-programmers-should-learn.html#axzz5atl0BngO)
[10 Free Courses to Learn Java from Scratch](http://www.java67.com/2018/08/top-10-free-java-courses-for-beginners-experienced-developers.html)
[10 Books to Learn Java in Depth](https://medium.freecodecamp.org/must-read-books-to-learn-java-programming-327a3768ea2f)
[10 Tools Every Java Developer Should Know](http://www.java67.com/2018/04/10-tools-java-developers-should-learn.html)
[10 Reasons to Learn Java Programming languages](http://javarevisited.blogspot.sg/2013/04/10-reasons-to-learn-java-programming.html)
[10 Frameworks Java and Web Developer should learn in 2020](http://javarevisited.blogspot.sg/2018/01/10-frameworks-java-and-web-developers-should-learn.html)
[10 Tips to become a better Java Developer in 2020](http://javarevisited.blogspot.sg/2018/05/10-tips-to-become-better-java-developer.html)
[Top 5 Java Frameworks to Learn in 2020](http://javarevisited.blogspot.sg/2018/04/top-5-java-frameworks-to-learn-in-2018_27.html)
[10 Testing Libraries Every Java Developer Should Know](https://javarevisited.blogspot.sg/2018/01/10-unit-testing-and-integration-tools-for-java-programmers.html)

[**What Java Programmers should learn in 2020?**
*Useful Tools, technologies, framework, and libraries Java programmers can learn in 2020*medium.com](https://medium.com/javarevisited/what-java-programmers-should-learn-in-2020-648050533c83 "https://medium.com/javarevisited/what-java-programmers-should-learn-in-2020-648050533c83")

[**Top 10 Java Online Courses for Beginners**
*If you are a computer science graduate or someone who wants to learn Java and looking for some awesome resources like…*medium.com](https://medium.com/javarevisited/top-5-java-online-courses-for-beginners-best-of-lot-1e1e240a758 "https://medium.com/javarevisited/top-5-java-online-courses-for-beginners-best-of-lot-1e1e240a758")
