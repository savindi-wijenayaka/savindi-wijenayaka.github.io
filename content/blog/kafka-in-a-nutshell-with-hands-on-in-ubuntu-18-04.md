---
title: "Kafka in a NutShell (with hands-on in Ubuntu 18.04)"
slug: "kafka-in-a-nutshell-with-hands-on-in-ubuntu-18-04"
date: "2019-03-29"
excerpt: "Hola Readers!"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/kafka-in-a-nutshell-with-hands-on-in-ubuntu-18-04-dc1cf35c9036"
featured: false
readingTime: 11
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/kafka-in-a-nutshell-with-hands-on-in-ubuntu-18-04.png"
---

Hola Readers!

Today we are going to mingle with another different topic, Kafka! Since it is an industry buzz word, I am sure you have heard of it, but maybe you didn’t try it out. If that is the case, today’s post is just for you 😊

I will discuss the following topics here:

1. What is Kafka
2. Why we need Kafka
3. Kafka Architecture
4. Features of Kafka
5. Hands-on

### What is Kafka

Apache Kafka is a Streaming Platform which was developed by Linkedin in 2011 for managing activities of Linkedin users. Later on, it was given to Apache Foundation, hence it is functioning as an opensource project as of now.

Most of the companies are using Kafka in their processes, including the founders of it, Linkedin and many big companies like Microsoft, Netflix, Pinterest, Airbnb, Adidas, Coursera etc.

![](https://cdn-images-1.medium.com/max/800/1*DiBiPdyrUwW5B2c6zTd9PA.png)

Users of Apache Kafka (Source: Apache Kafka, 2019)

As a Steaming Platform, it facilitates us with “Publishing and Subscribing" to a stream, processing streams and storing streams. It decouples the input streams and output streams and acts as a common platform to connect them.

So what is this streaming means? Let's say you are getting a huge bulk of data each second from different sources continuously. This is known as a stream of input data. Similarly, continuously going out data is known as an output stream. These streams we need to handle carefully, and process real-time, at least to some extent, if we need to save ourselves from going into major troubles

Before going into deep about the architecture and all, let's look at why we really need a Kafka like solution.

### Why Kafka

Do you know the 10-year challenge for the Technology industry?

![](https://cdn-images-1.medium.com/max/800/1*vCDpMEfC3DeXpaxcObLpHQ.png)

The 10-year challenge in the Technology industry

As you can see, back in the days, we used a single server for client applications and a single server for server applications. So there were no troubles. With the time passed by, the number of servers increased to scale, but that was also manageable for companies.

Trouble started with many different types of client-side applications trying to access many different types of server-side applications. For example, think of an e-commerce site. It has User Interface, Chatbots, etc. as client applications trying to access server-side applications like Databases, Data-warehouses, Security systems, Real-time monitoring systems, BI clients, etc.

So the communications between them will be more complex and in “many: many” kind of communication, which will look like the diagram on the right in the above picture. Also, note that different communications have their own set of requirements on aspects like security, level of robustness, performance, etc. So catering each and every concern of the communication while establishing numerous communications is the challenge.

Here is when Kafka comes in. Like I mentioned before, it decouples the input streams and output streams and acts as a common platform to connect them.

![](https://cdn-images-1.medium.com/max/800/1*5sAcSK_J4-d267wV6WnOoA.png)

How Kafka simplifies the communication

Now let's look at the actual architecture of the Kafka with relevant terminologies.

### Kafka Architecture

#### 1. Kafka Ecosystem Architecture

![](https://cdn-images-1.medium.com/max/800/1*b6MPZ1u8UEZS2CLf5ddkTQ.png)

Kafka architecture in a NutShell

- **Producers :**

Producers are the application that generates the content (or the ***“Input streams”***). If we take the above-mentioned example, it will be the User Interfaces, chatbots, etc.

- **Consumers :**

Consumers are the applications that will receive the generated streams, according to the above example, it will be the BI clients, Databases, Data-warehouses, etc.

- **Brokers:**

Kafka cluster is made up with a collection of Kafka brokers. Each of them has a unique ID and act as a computational unit.

- **Topic :**

When consumers need to take data, they need to know which data they want to have. For example, think like there are 5 branches of a retail company. Those 5 branches produce various categories of data like sales, finance, purchases, etc. These 3 branches act as 3 different producers. Let's assume, consumer 1, who is a data-warehouse, needs sales data from the producer 1 and producer 2, but not from the other branch. So how can it go and ask this from the Kafka Cluster without confusion? This is when the topics come to play.

A topic is a categorized dataset in simple terms. Only selected set of producers write a selected set of data into a ***“topic”***. If a consumer needs this dataset, it needs to subscribe to that ***“topic”*** so that, it avoids confusions.

- **Partitions:**

Some times, a single topic can be too large for one machine to store. Therefore, Kafka divides it to chunks of data which is called as ***“Partitions”*** and ***“distribute”*** the load between 2 or more nodes. Note that, only one partition is saved in one node since distribution is the whole idea behind the partitioning.

This idea of partitioning is very much similar to Database concept of partitioning where you can chunk data according to the year, first letter, etc.

- **Offset:**

Inside a partition, data is stored as a byte array, in the order they arrived into the partition. Therefore they are having an identifier named “Offset”, which is similar to an array index. This is used when a consumer is reading from a partition. Note that, a consumer should know 3 things about the data he wants to access when he is reading data from the Kafka cluster. that is,

1. Topic
2. Partition
3. Offset

- **Consumer Group:**

A consumer group is a set of consumers dedicated to one task. Consider the scenario I above mentioned regarding 3 branches of the retail company. After those 5 branches send the data to the topic, think that a Data-warehouse solution is consuming those data using a Consumer application. If only one consumer application is there, the time taken to consume data will be really high since it has to retrieve data which are produced by 3 producers only by himself. Note that these data might be continuously getting fed to the topic hence day-by-day the retrieval gap will get higher.

In such situation, we can have multiple consumers dedicated to the same task, as a consumer group. There are 3 important points when it comes to consumer groups.

1. Only one consumer in the group will consume data from one partition at a given moment of time. (i.e. no simultaneous consuming of data from a partition, by consumers in a one consumer group). This is to avoid multiple reads of the same data by the group.
2. As a result, the maximum number of consumers in a consumer group is equal to the number of partitions in the topic.
3. Two consumers from two different consumer groups can read from one partition simultaneously.

![](https://cdn-images-1.medium.com/max/800/1*nmVnMdlCOz-cbOxgBPC9FQ.png)

Consumers from two consumer groups reading simultaneously from a partitioned topic at a given moment of time

- **ZooKeeper**

ZooKeeper is another Apache Foundation Project. It is the support system to the Kafka cluster. The 3 basic functionalities of Zookeeper is as follows:

1. Managing membership
2. Electing new controller in case of failure of the existing one (more on this in replication section below)
3. Keeping metadata about topics like how many partitions, how many replicas, who are the controllers, etc.

#### 2. Kafka Cluster Architecture

There are 3 main architectures for a Kafka Cluster itself. However, the 3rd one is the practical industry standard for high availability and fault tolerance.

1. Single Node — Single Broker
2. Single Node — Multiple Brokers
3. Multiple Node — Multiple Brokers

### Features of Kafka

- **High throughput**

Because of the publisher-subscriber pattern of messaging, Producer throughput (Messages written per second) and Consumer throughput (Messages retrieved per second) are high even on the modest hardware.

- **Scalability**

Because of the Partitioning and the consumer group concept, Kafka achieve horizontal scalability (i.e. adding new nodes and distributing the computations to increase the performance) with **Zero-downtime**

- **Replication & Failover**

Kafka’s method of Replication is similar to the [Redis cluster concept of Replication](https://medium.com/@phantomgrin/redis-clustering-in-a-nutshell-with-hands-on-in-aws-8fb979ea2765). The difference is the process being synchronous in Kafka. (i.e. Kafka broker does not acknowledge successful transaction until the replication process is successful).

Similar to the Redis, Kafka also has a master, which in the Kafka terminology known as the “***Controller”***. Other replicas or the slaves are known as “***Followers***”.

In case of a Controller failure, ZooKeeper will elect a new controller out of the followers.

- **No data loss**

Since acknowledgment of data received is not done by the Kafka broker until the replication process ends, the “No data loss” is guaranteed.

- **Stream Processing**

Real-time Stream Processing capabilities are provided not only in consumers and producers but also separately as a service using **Stream API**

- **Durability**

Kafka achieves the durability since it is writing to the disk in each transaction, not to the memory.

### Hands-on in Ubuntu 18.04

Before starting the hands-on part, check whether you have Java installed using `java -version`. It should give an output like bellow

```
java version "11.0.2" 2019-01-15 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.2+9-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.2+9-LTS, mixed mode)
```

What we actually need to check is whether we have the JVM. So if this prerequisite is satisfied, you are good to go!

Use [Apache Kafka download site](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.2.0/kafka_2.12-2.2.0.tgz) to download the latest stable version. (I will be using “kafka\_2.12–2.2.0”)

Then open a terminal in the downloaded folder and un-tar and navigate inside to the directory:

```
tar -xzf kafka_2.12-2.2.0.tgz
cd kafka_2.12-2.2.0
```

Let’s start the ZooKeeper first. If you already don’t have ZooKeeper, you can use the script given with the Kafka package to have a quick-and-dirty single-node ZooKeeper instance.

```
bin/zookeeper-server-start.sh config/zookeeper.properties
```

This will give something like bellow at the end if it is a success:

```
[2019-03-29 22:07:39,620] INFO binding to port 0.0.0.0/0.0.0.0:2181 (org.apache.zookeeper.server.NIOServerCnxnFactory)
```

Do not close this terminal. Now open another terminal and start Kafka Server with below command:

```
bin/kafka-server-start.sh config/server.properties
```

this will give the following output if the server created successfully:

```
[2019-03-29 22:08:37,660] INFO [KafkaServer id=0] started (kafka.server.KafkaServer)
```

#### Create a Topic

As a start, let’s make a single partitioned single replica topic named “narmada”. Use a new terminal for this process.

```
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic narmada
```

We can check whether we are successful by using the following command:

```
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

![](https://cdn-images-1.medium.com/max/800/1*HPGAs9f7fV3w6hwbs2DThA.png)

Single replica topic created

#### Send messages to the topic

Kafka has a command line client coming with it. Let’s use that to send messages to the Kafka topic we created:

```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic narmada
```

Now type your messages and press Ctrl+C to exit.

#### Consume Messages from the Topic

Kafka has a command line consumer as well. Let’s use that to retrieve the messages from the topic.

```
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic narmada --from-beginning
```

![](https://cdn-images-1.medium.com/max/800/1*w0InAWid_ywMDqlm71vSaw.png)

Sending Message to a topic and consuming a Message from the topic

#### Setting up a multi-Broker cluster

This is not fun. Let’s expand the cluster by having 2 more brokers in our own local machine.

First, copy the configuration file twice with two different names like below:

```
cp config/server.properties config/server-1.properties
cp config/server.properties config/server-2.properties
```

Use `nano` or `vim` to edit the config files with the following data:

```
# config/server-1.properties:
```

```
broker.id=1
listeners=PLAINTEXT://:9093
log.dirs=/tmp/kafka-logs-1
```

```
# config/server-2.properties:
```

```
broker.id=2
listeners=PLAINTEXT://:9094
log.dirs=/tmp/kafka-logs-2
```

Open two more terminals and start the two new servers:

```
bin/kafka-server-start.sh config/server-1.properties
bin/kafka-server-start.sh config/server-2.properties
```

Now create a new topic with a replication factor of three:

```
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 3 --partitions 1 --topic replicated-savindi
```

Let’s check what happens with the above command

```
bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic replicated-savindi
```

Output:

![](https://cdn-images-1.medium.com/max/800/1*dDGRSR-7xP96vVsJmL5Z7A.png)

The replicated topic

Let me explain what these are

- “leader” is the node responsible for all reads and writes for the given partition. Each node will be the leader for a randomly selected portion of the partitions.
- “replicas” is the list of nodes that replicate the log for this partition regardless of whether they are the leader or even if they are currently alive.
- “isr” is the set of “in-sync” replicas. This is the subset of the replicas list that is currently alive and caught-up to the leader.

(Source: Apache Kafka, 2019)

Let’s check the single replica topic we created before:

```
bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic narmada
```

![](https://cdn-images-1.medium.com/max/800/1*YSGZ1s7vylgyrisNwL0eOg.png)

The single-replica topic

So you can see, there are no replicas in the first topic and the single server is elected as the leader as well.

Let's publish something to our replicated topic:

```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic replicated-savindi
```

![](https://cdn-images-1.medium.com/max/800/1*pGxBO8WJlAHM8PH858MVZg.png)

writing into the replicated topic

Next step is to consume these messages:

```
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic replicated-savindi
```

Output:

![](https://cdn-images-1.medium.com/max/800/1*3rd1WqKP_gTanOQ7ipZUxg.png)

Consumed messages of the replicated topic

#### Checking the Fault-tolerance nature

When we checked the replicated topic above with the`--describe` flag, we saw that it has Broker 0 as the leader. Let's check Broker 0’s PID and kill the Process to simulate the failover scenario:

```
ps aux | grep server.properties
kill -9 <PID> #Replace PID with your process ID
```

Now let’s check the replicated topic again:

```
bin/kafka-topics.sh --describe --bootstrap-server localhost:9093 --topic replicated-savindi
```

Notice how the leadership changed to a remaining replica.

![](https://cdn-images-1.medium.com/max/800/1*fVl0OCqfOf_GJ-tYeTFaLA.png)

Leadership changed. Note the “isr” missing node 0

Hooray! We are done with Kafka in a Nutshell. I hope it is simple and understandable. If you want more details, check out [“Thorough Introduction to Apache Kafka™”](https://hackernoon.com/thorough-introduction-to-apache-kafka-6fbf2989bbc1) by [Stanislav Kozlovski](https://medium.com/u/c520713b52a4). He gives more in-depth knowledge about many things including streaming. Also, let me know how this article is 🙈 See you soon with another blog!

Happy Coding!!!
