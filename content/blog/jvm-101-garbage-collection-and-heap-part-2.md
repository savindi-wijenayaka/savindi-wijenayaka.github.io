---
title: "JVM 101: Garbage Collection and Heap (Part 2)"
slug: "jvm-101-garbage-collection-and-heap-part-2"
date: "2020-08-08"
excerpt: "Hola Readers! Welcome back."
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/jvm-101-garbage-collection-and-heap-part-2-dc36b710638d"
featured: false
readingTime: 13
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/jvm-101-garbage-collection-and-heap-part-2.png"
---

Hola Readers! Welcome back.

Today we are going to talk about another interesting aspect of JVM (Java Virtual Machine). This is the second post of this series, so if you still didn’t check out the [part 1](https://medium.com/@phantomgrin/jvm-101-introduction-classloader-sub-system-jit-compiler-part-1-9e5a6782fa3e), make sure you read it.

The Garbage Collection and Heap is the most interesting part of the [JVM](https://medium.com/javarevisited/7-best-courses-to-learn-jvm-garbage-collection-and-performance-tuning-for-experienced-java-331705180686) (in my point of view), and I really enjoy talking about it. So here is what we will learn today.

1. Type of Memory Corruption Errors
2. What is Garbage Collector?
3. Who is eligible to be Garbage Collected?
4. Garbage Collection algorithms
5. Heap Structure and How it works

### Type of Memory Corruption Errors

Like we mentioned in [Part 1](https://medium.com/javarevisited/jvm-101-introduction-classloader-sub-system-jit-compiler-part-1-9e5a6782fa3e), when a Java program is executed, a runtime instance of JVM get created in the Machine’s memory. In other words, as JVM is also a process, it gets allocated with its own share of Memory from the Machine.

When it comes to JVM related Memory, there are mainly two types of errors.

1. ***Memory Leaks***: This happens when there are unused objects residing in memory. They have acquired some memory and it was not being freed even though they are not being used.
2. ***Dangling References***: References that are pointing at deallocated locations. For example, think there are two references (A and B) referring to the same object. Reference A is done with its work and deletes the object. Reference B doesn’t know about this. Then freed memory location will be given to a new object. Thinking it is the previous object, Reference B access the memory location. However, it is referring to the new object, not the old one.

### What is Garbage Collector?

Garbage Collector is the daemon thread (a low priority thread that runs in the background to perform certain tasks) that is responsible for the automatic memory management in the [JVM](https://javarevisited.blogspot.com/2019/04/top-5-courses-to-learn-jvm-internals.html).

There are a few types of Garbage Collectors.

1. **Serial Collector**: Single-threaded process that runs in time to time and performs the Garbage collection
2. **Concurrent Collector (Low-latency collector)**: GC thread runs parallel to the application and performs sweep stage concurrent to the application running. However, for the mark stage, it will stop the application. Better fit if the machine has high memory and CPU resources. Suitable for the applications that demand shorter pauses (i.e. low latency).
3. **Parallel Collector**: This collector runs multi-threaded. However, does not run at the same time as the application (not concurrent). It waits for a time threshold to get triggered and performs the garbage collection in a multi-threaded manner, hence being fast. Better fit if the machine has low memory and CPU resources. Suitable for the applications that demand high throughput.
4. **G1 (Garbage First) Collector**: A server-style garbage collector, targeted for multi-processor machines with *large memories*. It meets garbage collection (GC) pause time goals with a high probability while achieving high throughput. The G1 garbage collector is fully supported in Oracle JDK 7 update 4 and later releases and became the default in [Java 9](https://medium.com/javarevisited/5-courses-to-learn-java-9-features-in-depth-373f7afcf9fa). This collector requires a different heap structure and a fairly different approach in Garbage collection.

[![](https://cdn-images-1.medium.com/max/800/1*HA6IOg_WfvT8yytZm0x5sQ.jpeg)](https://www.java67.com/2020/04/top-5-advanced-courses-to-learn-java-perofrmance-concurrency-memory-management.html)

Types of Garbage Collectors (Source: [Youtube-Ranjith Ramachandran](https://www.youtube.com/watch?v=UnaNQgzw4zY))

### Who is eligible to be Garbage Collected?

When an object becomes abandoned, it becomes eligible to be Garbage Collected. The word “Abandoned” refers to objects that have no active references. An object can be abandoned due to mainly 3 reasons.

1. **Object going out of scope**:
   We know that the variables we use have scopes like local, global, etc. So when the program exits the scope of the object, that object becomes no longer needed. Hence, abandoned.
2. **Reference is assigned to a new object**:
   Say variable “a” is referring to the object “A”. Later if variable “a” is reassigned with object “B”, then object “A” does not have an active reference to it. Hence was abandoned.
3. **Reference is assigned to null**:
   Similar to the above scenario, instead of getting assigned to a new object, variable “a” get reassigned to “null”. Then the object “A” becomes abandoned.

Also note that if a class object (we discussed this in Part1) does not have any active reference, it is also eligible to be garbage collected.

### Garbage Collection algorithms

Garbage Collection algorithms are responsible for identifying dead objects and reclaiming the memory held by those dead objects. For this, there are several famous algorithms introduced by [Java](https://medium.com/javarevisited/top-5-java-online-courses-for-beginners-best-of-lot-1e1e240a758).

1. Mark-Sweep
2. Mark-Sweep-Compact
3. Mark & Copy
4. Concurrent Mark-Sweep (CMS)

All these Garbage Collection algorithms create some sort of pause in the overall application. Hence known as “**Stop the world**” activities. Why does it require to pause the application, will be the next question that comes into your mind. For example, think like this, when you are doing the identification of dead objects, it may take time. One object which you marked as “alive” will become actually abandoned by the time you finish the marking. Therefore to remove these kinds of ambiguities, it is required to pause the application. The key is to minimize this pause.

Let's have a look at each of these GC algorithms separately:

#### Mark-Sweep Algorithm

Mark-Sweep algorithm has two stages as the name implies; **Mark** and **Sweep**.

The Mark Stage of all 1–4 algorithms are actually responsible for the same thing. That is to identify ***Live objects***. Yes, you didn’t hear incorrect; it is responsible for identifying Live objects, not dead. This is done by finding ***GC roots*** and traversing the object graph to find out which objects are reachable.

GC roots or Garbage Collection roots are objects special for the Garbage Collectors. These roots are always at the beginning of the object graphs. There are 7 main kinds of GC roots. One GC root can fall into one or several of these kinds as well.

- **Class —**classes that are loaded by the system class loader. If the class is loaded by a custom class loader, it is not considered as a GC root unless that `java.lang.Class` instance belongs to one of the bellow-mentioned other kinds.
- **Thread** — a live thread
- **Stack Local** — local variable or parameter of Java method
- **JNI Local** — local variable or parameter of JNI method
- **JNI Global** — global JNI reference
- **Monitor Used** — objects used as a monitor for synchronization
- **Held by JVM** — objects that are held by JVM for its purposes

[![](https://cdn-images-1.medium.com/max/800/1*8ZXGeO_Fp7f-vy8HHn5l6Q.png)](https://www.java67.com/2019/08/best-books-to-learn-java-virtual-machine-in-depth.html)

Mark Stage (Image source: [GC Algorithms: Basics | Plumbr, 2020](https://plumbr.io/handbook/garbage-collection-algorithms))

After Mark stage with completed by identifying the live objects, the next stage in Mark-Sweep algorithm is Sweeping.

In the Sweep stage, the algorithm focuses on deleting the dead objects and reclaiming the memory held by them.

![](https://cdn-images-1.medium.com/max/800/1*AHV486VNqwHwBxl6wEb-QA.png)

Mark-Sweep Algorithm (Image source: [GC Algorithms: Basics | Plumbr, 2020](https://plumbr.io/handbook/garbage-collection-algorithms))

Do you see some issue from the above image? I guess you do. When the memory held by the dead objects are reclaimed, if dead objects were scattered in the memory (which is the common scenario), they will result in fragmented memory when deleted. (i.e. they will result in empty locations in between occupied locations.) Because of this fragmented memory, we will encounter `java.lang.OutOfMemoryError` even if we have memory. For example, think if we have an object called A which is comparatively large. It will not fit into any of the empty memory holes (check space in ash colour from the above image). But if we move all the occupied memory to one side and get rid of the fragmentation, we will be able to have space enough for object A.

Another downside will be the requirement of maintaining a free-list to keep track of what are the empty locations in the memory and its size.

To overcome these issues, the next algorithm, Mark-Sweep-Compact was introduced.

#### Mark-Sweep-Compact Algorithm

In this algorithm, the first two stages are similar to that of Mark-Sweep algorithm. As the third stage, Compact Stage comes.

Compact Stage gets rid of the fragmentation by moving all the live objects to one side of the memory.

![](https://cdn-images-1.medium.com/max/800/1*L1PoMDWf_Zud71I1ACstIw.png)

Mark-Sweep-Compact Algorithm (Image source: [GC Algorithms: Basics | Plumbr, 2020](https://plumbr.io/handbook/garbage-collection-algorithms))

So it solves our problem, right? It actually does solves one but gives birth to another. That is, it increases the pause time of the application.

To overcome this issue, another algorithm was introduced. That is Mark & Copy Algorithm.

#### Mark & Copy Algorithm

This approach also does the compacting of the occupied memory, but with a different mechanism.

Here, the memory is segmented into two regions. Let's say A and B. All the current objects are in Region A (both live and dead). Mark stage is identical to the Mark stage of two above-mentioned algorithms. The speciality comes with the copy stage where it copies the objects that are marked as “live” to the Region B. Since Mark and Copy stages can **happen simultaneously**, it reduces the overall pause time.

![](https://cdn-images-1.medium.com/max/800/1*be2sOK5Bj8VbCCl5cfHuUg.png)

Mark & Copy Algorithm (Image source: [GC Algorithms: Basics | Plumbr, 2020](https://plumbr.io/handbook/garbage-collection-algorithms))

#### Concurrent Mark-Sweep (CMS)

Concurrent Mark-Sweep is almost similar to Mark-sweep algorithm. However, CMS has an advantage over Mark-Sweep, as it **almost** runs concurrent to the application, resulting in a reduction of pause time. Note that I mentioned “almost”. This is because it actually stops the application around two times, one at the beginning and other towards the middle of the process. (Actually, the official name of this algorithm is “Mostly Concurrent Mark-Sweep”)On the other hand, concurrency comes with a price. We should have enough resources to afford as we have to share the processor with the garbage collector while the application is running. If an application has a large set of long-lived objects and runs on machines that have 2 or more processors, CMS can benefit them greatly. However, in the case of an application that requires low GC pause time, it is best to consider the use of CMS.

Now let's look at how each of these algorithms works hand in hand with the Heap structure of the [JVM](http://javarevisited.blogspot.sg/2011/11/hotspot-jvm-options-java-examples.html#axzz54oJiRW8k).

### Heap Structure and How it works

When it comes to Garbage collection, not only GC algorithms play a huge role, but also the Heap structure. Apart from the G1 collector, all others have a common Heap structure. However, the case is different in G1.

#### Heap structure for collectors except for G1

[![](https://cdn-images-1.medium.com/max/800/1*uB9dNT2gRLwpsQ6saBABrA.png)](https://javarevisited.blogspot.com/2011/05/java-heap-space-memory-size-jvm.html#axzz5SDsAfcC8)

Heap Structure for all collectors except for G1

Lots of objects created during the application execution have a shorter life span. However, there are objects that have longer life spans or ones that never die as well. If the whole heap is one huge space without any partition, then the Garbage collector will traverse through all objects to check if they are alive. Even though it will encounter a set of new objects in each traverse, it will also encounter a set of long-living live objects continuously. However, if GC can skip traversing these long-living ones repetitively, we can reduce the pause time further. That is why the concept of Young generation and Old generation was introduced. As the name suggests, the old generation contains the objects that have a longer life span and vice versa for the young generation.

When an object is initiated, it will be created in the young generation. After it survived for some number of Garbage Collection Cycles, it will get promoted to the old generation. The default number of cycles that an object should survive to get promoted to the old gen is 15. However, we can change this as we want by using the Java command line parameter: **-XX:MaxTenuringThreshold**

In a practical sense, the young gen is like the dustbin in your room and the old gen is like the dustbin in your street. You regularly clean your room’s dustbin and municipal council will clean the street’s dustbin every week. Similarly, GC Cycles happen more frequently in young gen than old gen. Also cleaning the old gen takes more time than the young gen.

The young generation is again divided into three parts to facilitate effective implementation of Mark & Copy algorithm.

When an object gets created at first, it will be created in the Eden space of the young gen. After some time, a GC cycle will be triggered in the young gen, when the Eden space becomes full or in a timely manner. This GC cycle is called “***Minor GC***” or “***young collection***”. It will look at all the objects in the Eden space (and the From Space) and mark the live ones while copying them to the “To Space”. After the Mark & Copying is done, all objects that survived the cycle who are now in “To space” will be moved to the “From space”. If any of the objects survived the number of cycles equal to the Tenure Threshold, then these were moved to Old gen during the copy phase instead of moving to the “To space”.

[![](https://cdn-images-1.medium.com/max/800/1*zh0fMywcbP5lkze8d1xMKg.gif)](https://javarevisited.blogspot.com/2011/04/garbage-collection-in-java.html#axzz4zt6jlTWS)

How Garbage Collection works. (Assumption: MaxTenuringThreshold=2)

However, if the To space doesn’t have any space for a larger object that survived a GC cycle, then it will be moved to the Old gen directly, even if it does not meet the MaxTenuringThreshold.

After some minor GC cycles, there will be a “***Full GC***” triggered. In this GC cycle, young gen, old gen and even the Metaspace (the one that keeps the static members, class definitions etc. i.e. metadata) will be garbage collected.

This approach of dividing the Heap to generation and doing the garbage collection is known as the “***Generational Collection***” in the Java world.

Even though there is still the notion of young, old and survivor is available in G1 collector based heap structure, it has a huge difference compared to the above structure. Let’s have a quick look at that as well:

#### Heap structure for G1 collector

![](https://cdn-images-1.medium.com/max/800/1*DwAeKDeaR66T5wsogyx2pA.jpeg)

G1 Heap Structure (Source: [Oracle Documentation](https://www.oracle.com/technetwork/tutorials/tutorials-1876574.html))

In the G1 heap structure, the heap area is divided into small equal-sized (default 2MB), higher number of partitions which acts as either Eden space, survivor space, old generation or unassigned space. As the partition is smaller, it allows the G1 collector to empty a partition quicker than the case of other heap structure.

When the GC is triggered it looks at the regions that have a higher amount of garbage. That is why this is called garbage first collector. It quickly grabs the surviving objects and copies them to an unassigned area. If the collected region was Eden space, then the copied unassigned region becomes a survival space. Speciality in here is, if there is a region with no survivors, then that region can be straight-away become an unassigned region without any need for further work.

Because of this special structure, G1 collector can always optimize the collection process by selecting the areas which have lots of garbage, as it results in minimum work needed to be done to empty the areas. As studies of real-world Java applications have shown that more than 90% of objects don’t survive their first garbage collection, it is often common to find these small partitions almost filled with garbage, hence cleaning requires minimum effort. This phenomenon is described nicely in-depth in [Dynatrace blog post](https://www.dynatrace.com/news/blog/understanding-g1-garbage-collector-java-9/), which you can read if you want to go deeper in G1.

I guess it was an interesting article talking about things that you have not paid much attention to. Hope it did not drag a lot and that you enjoyed reading.

Anyway, don’t forget to leave a comment below. Criticisms are greatly welcome as it helps me to write better next time. 😇

Let’s meet soon with Part 3. Till then, Happy Reading!! ❤️

And stay safe as well ❤️

Edit: I’m sorry for the long delay without the part 3. I’m currently not working much with Java so have sort of lost the touch. I don’t want to merely publish something and that is why I still didn’t publish part 3. Hope you can understand (Date: 2021/06/03)
