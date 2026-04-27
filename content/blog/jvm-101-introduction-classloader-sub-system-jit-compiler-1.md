---
title: "JVM 101: Introduction, ClassLoader Sub-System & JIT compiler (Part 1)"
slug: "jvm-101-introduction-classloader-sub-system-jit-compiler-1"
date: "2020-03-21"
excerpt: "Hola Readers! Today I brings you a small but yet fresh articles series related to the Java memory model. This is one of the topics I really…"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/jvm-101-introduction-classloader-sub-system-jit-compiler-part-1-9e5a6782fa3e"
featured: false
readingTime: 11
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/jvm-101-introduction-classloader-sub-system-jit-compiler-1.png"
---

Hola Readers! Today I brings you a small but yet fresh articles series related to the Java memory model. This is one of the topics I really love and thought of writing for a long time. Hope you will enjoy! 🤗

Anyway, let's dive in. Today we are going to learn something related to Java. Many of us, developers, started off as Java developers, some of us may have drifted to other areas, but, we all usually keep one step in Java, as it is one of the vastly used programming languages in the world. However, one thing that most of us does not pay attention to is under the hood detail regarding type lifecycle and memory model of Java. But yet, these things are important to understand when creating industry-level applications.

There is a separate component that handles these two tasks along with some other small tasks. That is JVM or Java Virtual Machine.

The topic of JVM is a bit big. Hence, I will discuss it in 3parts:

1. Introduction, ClassLoader sub-system & JIT compiler
2. Garbage Collection and Heap
3. Stack and other Runtime data areas

This post is part 1: Introduction, ClassLoader sub-system and JIT compiler, where we will talk about the big picture of the JVM, responsibilities of ClassLoader sub-system and what JIT compiler does.

### JVM and responsibilities

As the name suggests, JVM is a virtual machine that is capable of executing Java bytecode. (If you are not sure what is Java Bytecode, check out my previous post, [How Java achieve Platform Independency](https://medium.com/javarevisited/java-platform-independency-2dddd92a53f8)). However, it has several other responsibilities as well:

1. Loading and interpreting Bytecode
2. Security
3. Automatic Memory Management

One thing to note that is there is ***no*** “***universal JVM design”***. There is a ***Specification*** of what needed to be included in a JVM, provided by Oracle Corporation, and one can use this to implement his/her own JVM. However, there are enough industry level implementations of these specifications existing out there like Eclipse OpenJ9 from IBM, HotSpot JVM from Oracle, etc.

Also, another important point to note is that JVM is ***platform dependent***. That means Windows OS’s JVM is different from your Linux machine’s JVM. This is to achieve Java’s key feature of Platform Independency (Read more on [How Java achieve Platform Independency](https://medium.com/javarevisited/java-platform-independency-2dddd92a53f8))

Whenever you run a Java program, a runtime instance of JVM is created and loaded to the memory. Such one runtime instance is responsible for running only one Java Program.

So now let's have a look at how JVM cater its responsibilities that I mentioned above and what components it uses for each of these tasks.

[![](https://cdn-images-1.medium.com/max/800/1*U4AcVNtejtT1Fa3oMozm5w.png)](https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html)

JVM Architecture in one image

As you can see from the above image, there are three major parts in JVM; ClassLoader, Runtime Data Areas (RDA) and Execution Engine. We will discuss each of these three in-depth in this post series. Other than that, we also have Native method interfaces and Native method libraries. In brief, each of these has the following responsibilities:

1. ***ClassLoader Sub-system***: Accept the Bytecode and loads the class (required for the execution of the Bytecode) to the memory if it is accessed for the first time
2. ***Runtime Data Area***: Have several tasks which are carried out by its five main components. (It’s hard to brief ☹️ Check next 2 posts of this series)
3. ***Execution Engine***: Executing the bytecode loaded to the RDA, piece by piece and GC cleans the heap.
4. ***JNI (Java Native Interface)***: Interface for Execution Engine to access Native Libraries which are written in languages like C and C++
5. ***Native Method Libraries***: Collection of Native method libraries that are required by the Execution Engine to effectively communicate with the Operating System.

Let's first discuss the ClassLoader Sub-system in detail.

### ClassLoader Sub-System

The ClassLoader is the one that accepts the bytecode, and responsible for loading the class objects for types specified in the bytecode, into the Heap (in RDA). These class objects are created only once, when the ***“type”*** is accessed for the very first time.

#### When is the First time to load a class object of a class?

1. “new” instance of a class is created
2. Invoking of a static method in a class
3. Accessing a static field in a class (Except in the case of accessing a compile-time constant)
4. Sub-class is loaded to the memory (it internally invokes the super-class)
5. Run from the command line (Ex: `java hello.class`)
6. Reflection

> Side note: All 2 to 5 is true for Interfaces as well from Java 8 onwards. (4th point will be loading of sub-interfaces, not sub classes, in the case of interfaces)

#### Who has class objects?

Class objects contain meta-information about types like Class name, Superclasses, Package, Methods, Fields, etc. Not only classes have class objects, but also Primitive types, Reference Types (Classes, Interfaces, and Arrays), and even void have a class object.

Array’s class object is a bit special. Same type, same dimension arrays (irrespective of their length) have the same class object.

Ex: int[5] and int[100] are having same class object as they both are 1D integer arrays.

#### Class loading process and stages

[![](https://cdn-images-1.medium.com/max/800/1*5HrhsDMFiJJWwRtpFky8xQ.png)](https://www.java67.com/2016/08/10-jvm-options-for-java-production-application.html)

Class loading Process

Each time when there is a requirement to access a type, the JVM checks whether its class object exists in the Heap. If it does not exists, then “ClassLoader Sub-system” does not only the process of finding the .class file and creating the class object, but also the linking and initializing. In other words, ClassLoader sub-system takes care of three tasks:

1. Loading
2. Linking
3. Initializing

![](https://cdn-images-1.medium.com/max/800/1*_49LasCAmG-DDQ-UtLjT0g.png)

ClassLoader Sub-System and Its Process stages

#### Load Stage

In the Loading stage, 3 main class loaders, search for the .class file, in various locations and create the class object if .class file is found. Those 3 main ClassLoaders are:

1. Bootstrap (Primordial) ClassLoader
2. Extension ClassLoader
3. Application (System) ClassLoader

These three ClassLoaders are arranged in a ***Parent-Delegation Model*** (something similar to the class hierarchy) where Bootstrap ClassLaoder is at the top of the hierarchy and considered as the ***most trustworthy*** ClassLoader. (Trustworthiness reduces when traversing down the hierarchy)

When a bytecode is accessing some type and if it doesn’t find its class object in heap, it first contact the Application ClassLoader for help in finding .class. Since the Application ClassLoader is at the bottom of the hierarchy, he then contacts his parent, Extention ClassLoader, for assistance, who then calls his parent Bootstrap ClassLoader. Therefore, initial search for the .class starts from Bootstrap ClassLoader.

Bootstrap ClassLoader check for the class in the Primary packages and classes (i.e. in Core Java API). In other words, it checks `jdk/jre/lib/rt.jar` for the required class. If not found, then Bootstrap ClassLoader pass the baton to Extension ClassLoader who checks the additional application classes from standard java extension APIs. This means, Extension ClassLoader is checking the `jdk/jre/lib/ext` directory. If it also can’t find the class, then it calls the Application ClassLoader who checks the `CLASSPATH`. If Application ClassLoader also fails to find the class, the`java.lang.ClassNotFound` exception will be thrown.

One thing to note here is that sometimes there may be another ClassLoader at the bottom of the ClassLoader hierarchy called “**User-Defined ClassLoaders**”. These are, as the name suggests, user-defined ClassLoaders. They are written in java and extends an Abstract Class named `java.lang.ClassLoader`. Its responsibility is to check for the class in non-standard, user-defined sources such as databases. If such User-defined ClassLoader exists, it is considered as the one that accepts the Bytecode initially and the one that checks for the class at last after the Application ClassLoader fails to find the class. Also as it resides at the bottom of the ClassLoader Parent-Delegation model, it is the most untrustworthy ClassLoader.

Lets say that one of our ClassLoaders found the .class of the particular type, then it will load it and move to the next stage which is Linking stage.

#### Link Stage

The Linking stage takes the class object as the input and performs 3 major linking related steps; the 3rd one being optional and on-demand depending on the JVM implementation.

***1.Verification:***

In the verifying process, the ***Bytecode verifier*** checks the type’s .class to see whether it has Bytecode Integrity. It checks whether the structure is correct, compatible with the JVM, generated by a valid compiler etc.

One may question why we need a verification step as the compilation process do the verification part also. The issue comes if the .class is not from the native compiler. Since Java programs are portable via network, the .class we are accessing might be a one that we had downloaded and was created by a hostile compiler. That is why the verification process is again carried out in the Link Stage.

If some anomaly is detected in the verification process, it will throw a `java.lang.VerifyError`, which in return throws `java.lang.LinkageError`.

***2. Preparation:***

In Prepare step, JVM allocates memory to the static variables and initialize them with the default values.

Ex: boolean → false

If the process is triggered as a result of instance creation, instance fields are also allocated with memory and assigned to defaults. However, this happens only after static fields of the whole class hierarchy of the current class is taken care of.

If there is a case where memory is not enough to be allocated, `java.lang.OutOfMemoryError` will be thrown.

***3. Resolution:***

If there are symbolic references (logical references that point to other classes), resolve them by loading the reference classes to memory and replacing the symbolic references using actual memory locations of them. Note that, if one symbolic reference is used multiple times in the class, resolving happens only once.

Use of symbolic references and resolving them in runtime is known as ***Dynamic Linking***. As mentioned before also, this step is optional or on-demand. That is because there are two approaches to dynamic linking.

1. Eager Linking: Linking happens right after the Preparation Step
2. Lazy Linking: Linking happens after the Initialization Step, only if statement with the symbolic reference is executed)

Most of the JVMs use Lazy linking because most of the time, the statements with symbolic reference does not get executed, hence, loading them to the memory is an utter waste of resources.

If somehow, the class referred by the symbolic reference is not found, the process will throw an exception `java.lang.ClassDefNotFound`, which in return throws `java.lang.ClassNotFound` exception.

#### Initialize Stage

Initialize the static variables and blocks with actual values. This happens in a Top-Down manner starting from superclasses of the current class which is being loaded to the memory.

### Execution Engine

![](https://cdn-images-1.medium.com/max/800/1*TMFWd2lroM_456fCgdB2nQ.png)

Execution Engine

Inside the Execution engine, there are 3 major parts;

1. Interpreter — Similar to any other interpreter. Its responsibility is to interpret the instructions in the bytecode.
2. Garbage Collector — Automatic Memory Management (Discussed in part 2: Garbage Collection and Heap)
3. JIT compiler

#### JIT Compiler

The JIT compiler or the Just-In-Time Compiler is the one that contributes most to Java’s fast execution. Its main responsibility is to identify frequently executed codes and compile them to Native code to access later on in the next execution of that particular code. Hence, resources are not wasted on doing the same task, several times (like in the case of traditional interpreter) and time taken is greatly reduced.

Let’s take an example:

Imagine that you have two methods; method a() and b(). This a() might be executing for 500th time. Hence, the JIT compiler sees that it is getting executed a lot. So what it does is, pre-compile that method to native code and optimize it further for fast execution. So when the method a() is triggered for the 501st time, instead of Interpreter interpreting the method line by line, the native code corresponding to the particular method (which is optimized) get executed. Now say this method get executed for 2000th time; then the JIT compiler performs another round of optimization on the native code.

But the method b() might not be like method a() and it may be executed for like 10 times. Then that method will be interpreted each time it was invoked.

To handle this process, JIT compiler has 4 parts:

1. ***Hotspot profiler***: Detects and profiles the “Hot spots” i.e. frequently executed code snippets.
2. ***Intermediate code generator***: Responsible for generating the intermediate code.
3. ***Code optimizer***: Performing optimization on generated intermediate code.
4. ***Target code generator***: Generates native code.

I guess it was an interesting article talking about things that you have not paid much attention to. Hope it did not drag a lot and that you enjoyed reading.

Anyway, don’t forget to leave a comment bellow. Criticisms are greatly welcome as it help me to write better next time. 😇

Let’s meet soon with Part 2. Till then, Happy Reading!! ❤️

And stay safe as well ❤️

[**Top 5 Courses to learn JVM Internals, Memory Management, GC and Performance Tuning in Java**
*For a senior Java developer, it's essential to know how JVM works and how to troubleshoot issues with respect to…*javarevisited.blogspot.com](https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html "https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html")

[**Top 5 books to learn Java Virtual Machine, Garbage Collection, and Performance in-depth**
*In the last couple of years, I have seen a trend of many Java developers wants to learn more and more about JVM…*www.java67.com](https://www.java67.com/2019/08/best-books-to-learn-java-virtual-machine-in-depth.html "https://www.java67.com/2019/08/best-books-to-learn-java-virtual-machine-in-depth.html")
