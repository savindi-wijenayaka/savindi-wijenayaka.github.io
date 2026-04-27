---
title: "Redis Clustering in a Nutshell (with hands-on in AWS)"
slug: "redis-clustering-in-a-nutshell-with-hands-on-in-aws"
date: "2019-03-22"
excerpt: "Hola once again! Today we are going to mingle with a different topic, Redis! Since it is an industry buzz word, I am sure you have heard…"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/redis-clustering-in-a-nutshell-with-hands-on-in-aws-8fb979ea2765"
featured: false
readingTime: 14
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/redis-clustering-in-a-nutshell-with-hands-on-in-aws.png"
---

Hola once again! Today we are going to mingle with a different topic, Redis! Since it is an industry buzz word, I am sure you have heard of it, but maybe you didn’t try it out. If that is the case, today’s post is just for you 😊

Without further due, I’ll give you a quick view of what this post will cover.

1. What is Redis
2. Who uses Redis
3. What is sharding & how Redis do it
4. Replication & Failover in Redis
5. Trade-off of consistency
6. Redis as a Persistence Storage
7. Pros and Cons
8. Simple Hands-on with AWS EC2

### What is Redis

Redis or the ***“Remote Dictionary Server"*** is a BSD licensed Open source Key-Value based NoSQL Database which can be used for many things like caching, pub/sub workflows, Fully-fledge database work etc. Its main value proposition, the speed, is achieved by residing in the memory. That is why Redis is known as an In-Memory database. However, being In-Memory suggest that it is volatile. But Redis provides options to become a persistent database by writing to disk in different ways.

Another specialty in Redis is supporting many complex data structures. Those include Strings, Lists, Sets, Sorted Sets, Hashes, Bitmaps, HyperlogLogs, and Geospatial Indexes.

If we have a glance at the history of Redis, it was a project initiated by Salvatore Sanfilippo back in the days and was first released on 10th May 2009. It is cross-platformed and written in ANCI C.

### Who uses Redis

Redis is one of the widely used Database in the world currently, ranking at number 8 in all Database Engines category and ranking at number 1 in the Key-Value store category (DB-Engines, 2019)

![](https://cdn-images-1.medium.com/max/800/1*l0_iIhISsSuWEjoaNgitrg.png)![](https://cdn-images-1.medium.com/max/600/1*BDrRW5h_R5NeBdwZ8X1u5g.png)

Redis ranking as at March 2019 (source: DB-Engines, 2019). Overall rankings in the left and Key-Value store rankings in the right

Some of the major companies or solutions that use Redis in practice includes Twitter, GitHub, StackOverFlow, Flickr, Alibaba, Instagram, SnapChat and Pinterest. You can check out the full list in [Techstacks.io](https://techstacks.io/tech/redis).

### Clustering and Sharding

When there is a large amount of data needed to be stored, it is natural to exhaust one machine (or Node). In such a situation, the most attractive solution is going into distributed architecture.

Similarly, in Redis also, we have the concept of ***clustering***, where you can divide your data to be stored in multiple nodes, who works together to achieve the common objective.

So how does Redis do this? That is were ***“Sharding”*** comes into the picture. In simple terms, sharding means partitioning (like in SQL database terminology). In Redis, every key that we save is conceptually a part of ***“Hash slot”***. There are 16384 Hash Slots in a Redis implementation (whether it is a standalone version of Redis or clustered one, doesn’t matter). In sharding, these Hash slots are getting divided between the nodes, hence, each node carries a subset of Hash Slots.

For example, if the cluster need to have 3 nodes, the Hash slots will be divided between them like,

- A — 0 to 5500
- B — 5501 to 11000
- C — 11001 to 16384

Let say you are adding a node newly. What will happen is, A, B, and C will transfer some of its slots to the new Node. Similarly, in removing, (let's say we are removing C from the cluster of A, B, and C) A and B will take C’s Hash Slots and make C capable of abandoning the Cluster.

This process of moving the Hash slots from node to node (or partitioning of Hash slots — Sharding) is not requiring the operations to stop or pause. Hence, adding and removing of nodes also does not requires operations to stop or pause. Therefore, it ensures no downtime for the cluster i.e. maximum availability.

### Replication & Failover in Redis

Redis follows a Master-Slave replication process. Now, you might be wondering what that is. Let me explain:

Let’s take the above example I mentioned; the cluster of A, B, and C. The client is directly talking with the cluster, and one of the masters will be accepting the request. In here if the B fails, the whole cluster will fail since we don’t have the Hash Slots from 5501 to 11000.

But, what if we have a replica for each of A, B, and C nodes? Let’s say these replicas are A1, B1, and C1. They are called ***“Slaves”*** in the Redis world, and A, B, and C is known as ***“Masters”***. Each Slave is an exact copy of its master (theoretically. I will discuss when it is not, in the Trade-off section) and one Master can have multiple Slaves as well.

So does how this ensures the high availability or what happens in a failover scenario?

Let's say B had some internal issues and stopped working. Others in the cluster will get to know it by the ***“Gossip Port”*** since they run node-to-node communication (including health checks) through this port. Then A and C does voting and, will promote one of the B’s replicas to be a Master. In this example, since we have only B1, it will be promoted to be the new master. If the B rejoins the cluster, it has to be a slave, not a master.

![](https://cdn-images-1.medium.com/max/800/1*HWfHlPwAZ7su4hVt4n3UUQ.gif)

Failover Scenario in Redis

In a nutshell, even if the B fails as a master, since its slave takes his position and does his work, the cluster does not fail. Hence, it ensures maximum availability as well.

The replication mechanism provides basic two uses in the Redis clusters.

1. Multiple Reads or Sorts at a time — performance improvement
2. Recovery in the case of failure — high availability and fault-tolerance

Note that, I only took one replica scenario as an example. you can have N number of copies of your data using N-1 replicas for a master. However, if all these N nodes ( N nodes means including the master) fail, the cluster fails as well. Therefore, if you are going for a cloud solution, like AWS (Amazon Web Services), the best practice is to have a Master in one availability zone and each replica in separate availability zones.

### Trade-off of consistency

In delivering Redis’s value proposition, the Performance, it has to trade off between Performance and Consistency. Redis cannot guarantee strong Consistency, i.e. there is a possibility for a ***“Write”*** to be lost. This can happen due to two reasons: Asynchronous Replication and Network Partitioning.

#### Asynchronous Replication Scenario

Consider above example and a situation where a client is writing to the Master A. As soon as the client finish writing, A acknowledge it by sending an “OK” message to the client, without writing it to its replica (slave) A1. A writes to its slave A1, after the acknowledgment is sent to the client.

What if, A fails after the acknowledgment is sent, but before writing to the slave? It will make the other masters, B and C, to select A1 as the new master. But, A1 does not have the last write that client did to A. If the A rejoin cluster, it will be placed as a slave of A1. It will look at A1, and update itself by flushing the last write of the client, since, in Redis, Master is getting copied by the slaves. In this case, this last write of the client will be forever lost.

Note that, replication process can be configured to be synchronous via `WAIT` command. However, that also does not guarantee 100% consistency. Instead, it will make it degrade in performance aspects. But in case the consistency is very crucial to you, there are commercial solutions available like SOSS (ScaleOut State Server) or Amazon ElastiCache, which are In-Memory Data Grid (IMDG) implementations that guarantee no loss of data.

![](https://cdn-images-1.medium.com/max/800/1*JTPK2TxGIuuen7n67BojZA.gif)

Asynchronous Replication Data Loss

#### Network Partitioning Scenario

There can be a situation where there is a network partitioning, which result in the client on the minority side with at least one master.

Let take an example where A ends up alone with the client in the minority side while B, C, A1, B1, and C1 are in majority partitioning. When the client tries to write not knowing about the partitioning, Master A accepts the writes. If Partition lasts only a few seconds, it will be ok. But if not, the majority side understands that A is no longer in the communicating, hence elect A1 as new Master. At that moment, A also stops accepting the writes. However, the data written until the node time-out is forever lost even if the A rejoin the cluster. (because A is rejoining as a Slave since A1 is promoted). This “node time-out” is a parameter that we can tune in Redis clustering.

### Redis as a Persistence Storage

Like I mentioned before, Redis is an In-Memory database with Persistency option. So let's look at how does Redis achieves Persistency while residing in the Volatile memory.

Redis achieves this in 2ways.

1. RDB Mechanism
2. AOF logs

#### RDB Mechanism

RDB (Redis Database Backup) mechanism is very much similar to the SQL database’s concept of the snapshot. RDB file is a snapshot taken of all the user data at a given point-of-time, which is saved in secondary storage (permanent storage — in disk etc.) and used for the recovery processes. This snapshot taking can be invoked through 3 different triggers:

1. Time transpire — periodic automatic invocation
2. Reaching a change threshold — periodic automatic invocation
3. `SAVE` Command — forceful invocation

However, you can still lose data which were written after the last snapshot, in a cluster failure situation, since the RDB mechanism is mostly periodic. But on the contrary, being periodic ensures the process is less resource intensive.

#### AOF logs

The Append-Only Files (AOF) writes all operations received by the server to the disk. This process happens after each operation. Hence, it is very resource intensive. AOFs are also very large compared to the RDB Files, which are by default compressed. Therefore, larger disk space is needed for storing AOFs.

On the other hand, since it writes in each operation, it can guarantee minimum data loss in a cluster failure.

In practice, both of these methods are being used in industry; sometimes, both together.

### Pros and Cons

#### Pros

- **Performance (Speed):**

Since Redis is In-memory, it reduces the overhead in accessing the Disk to retrieve data, since it requests from disk only when the data is not available in Redis cache.

![](https://cdn-images-1.medium.com/max/800/1*Bk0FdzoR6HNGQlW6bRQ3cg.png)

How Redis improve performance by minimizing disk reads

There are some other options which are available in Redis for performance optimization. For example, pipelining feature which clusters multiple commands and sends them at once to the cluster.

Another mechanism in achieving high performance is the architectural design of the cluster. For example, have a look at the bellow architecture which optimizes the performance in a caching use case.

![](https://cdn-images-1.medium.com/max/800/1*X79l6aaIvku_gIVi8fEkag.png)

Architecture to maximize performance

- **Durability**:

Since there is an option to be written into Disk, Redis can be used as both Fully-fledge Database and Caching system.

- **Multi-language support :**

According to [Redis.io](https://redis.io/clients), there are many languages supported by the Redis including, C, C#, C++, Java, Python, Scalar, Ruby, Go Lang etc.

![](https://cdn-images-1.medium.com/max/800/1*jF5w_XdEbODG3TaGOvfeTA.png)

Redis-supported clients (source : Redis.io, 2019)

- **Flexibility and Simplicity**
- **Scalability**

#### Cons

1. The possibility of Data loss

### Simple Hands-on with AWS EC2

You can use any cloud provider for Redis clustering. AWS is just an example. Also, I will only use free-tier enabled resources here so that anyone can follow along. Now let’s begin the hands-on part!

Before going into the coding, let me brief you what we are building:

> Note that the **minimal cluster** that works as expected requires to contain at least three master nodes. For your first tests it is strongly suggested to start a six nodes cluster with three masters and three slaves. (Redis.io, 2019)

We will implement a minimal cluster today, as per the recommendation of Redis. Our architecture will look something like below:

![](https://cdn-images-1.medium.com/max/800/1*FWXR7r_pu8XYu46X6jeLLg.png)

First of all, set up 3 EC2 machines with Ubuntu 18.04 AMI and free-tier enabled resources (t2.micro, 30GB or less storage etc. ). Hereafter I will call them as servers.

Note that you need to allow TCP access in your security group for port number 6379, 6378, 16379 and 16378 ( lower ports for user communication and higher ports for node-to-node communication channel which is known as ***“Cluster Bus"*** or ***“Gossip port"***)

SSH to the created machines using your favourite terminal. (TIP: If you are Linux-based I would suggest Terminator)

Next, do the following in each server to update packages, repositories and to install Redis server in the particular server.

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

You can check whether the server is properly set with Redis by using `redis-cli` command and `ping` like below:

![](https://cdn-images-1.medium.com/max/800/1*OfaUQ0f2br0cBGR0Odl19w.png)

redis-cli PING and PONG

Type `exit` to quit the redis-cli mode.

Now it is time to edit the configuration files. Use nano or vim to open the redis.config file in the editing mode and change configurations like bellow. I will use nano here.

```
sudo nano /etc/redis/redis.conf
```

```
++++++++++++++++++++++++++
```

```
bind 172.31.35.161 127.0.0.1 ::1    # bind private-ip
port 6379
cluster-enabled yes
cluster-config-file nodes-6379.conf
cluster-node-timeout 5000
```

Now we will start the redis-server service and check whether it will give a running status or not. All these steps you can do simultaneously in all 3 servers we built in AWS.

```
sudo service redis-server restart
sudo service redis-server status
```

If you followed along with me, you will end up with something like bellow

![](https://cdn-images-1.medium.com/max/800/1*xhzQfxwpQ38ck_P9gui52Q.png)

Redis-server service up and running

If you are successful up to this point, go ahead and build the cluster like below:

```
redis-cli --cluster  create 3.16.46.73:6379 52.14.95.230:6379 18.220.208.147:6379
```

```
#use PUBLIC IPs not PRIVATE IPs
```

This will ask you to confirm the sharding, and you have to type “yes” for it.

![](https://cdn-images-1.medium.com/max/800/1*2qjss7War8dyYW0tnmPCPQ.png)

Confirm Sharding by typing “yes”

If everything is correct, especially the configuration part, you will end up with a success message:

![](https://cdn-images-1.medium.com/max/800/1*c1mNxEzhgZfo0fln3m4XHQ.png)

Cluster creation success

When you run `redis-cli -p 6379 cluster nodes` and you will see your all 3 master nodes in the cluster.

![](https://cdn-images-1.medium.com/max/800/1*RHOedT1a454J6WxfA9r0Rg.png)

In case there is an issue, use `sudo ufw allow 16379` in your firewall settings. This is the port used as Gossip port.

Now let's create our slaves. First, copy the configuration file.

```
sudo cp /etc/redis/redis.conf /etc/redis/slave.conf
```

Now change the configurations like below. (Since we copied the master’s config, we will have to only change port and cluster config file parameters.)

```
sudo nano /etc/redis/slave.conf
```

```
++++++++++++++++++++++++++
```

```
bind 172.31.35.161 127.0.0.1 ::1    # bind private-ip
port 6378
cluster-enabled yes
cluster-config-file nodes-6378.conf
cluster-node-timeout 5000
```

Then run the server.

```
sudo redis-server /etc/redis/slave.conf
```

You can check whether the slave is working properly by a simple ping-pong like below using the `redis-cli -p 6378`.

![](https://cdn-images-1.medium.com/max/800/1*jt0KuyjMhMFXfy-bfMJhgw.png)

Since our slave is working properly, let's add him to the cluster.

```
redis-cli --cluster add-node 172.31.32.127:6378 172.31.34.135:6379 --cluster-slave
```

```
# First IP is Server1 IP (Current server which the slave resides)
# Second is Server3 IP (Other server which the Master node resodes)
```

Do the same thing in the other 2 servers, to add slaves.

![](https://cdn-images-1.medium.com/max/800/1*7EG_GvaoyuYCB8bapcV6Yg.png)

Successful add of all 3 slaves

Now you can choose any server to check the cluster. Use the previous command we used; `redis-cli -p 6379 cluster nodes`

![](https://cdn-images-1.medium.com/max/800/1*kNml2bQy9zMp-AMsg3ZIyQ.png)

After all 3 slaves join the cluster

Now we can play with the cluster! First, use `redis-cli -p 6379` to use Redis CLI. I will SET two values and retrieve them:

![](https://cdn-images-1.medium.com/max/800/1*LGU-uHn0AF-5A1AdvrHIqg.png)

SET and GET commands to use Key-Value pairs

After you are satisfied with playing around in Redis Cluster, don’t forget to terminate all your EC2 machines, since only 750 hours per each month is provided in free-tier.

Hooray! We are done with Redis Cluster in a Nutshell. Today we used AWS as well. I hope it is simple and understandable, although it is slightly dragged more than I expected. Also, let me know how this article is 🙈 See you soon with another blog!

Happy Coding!!!
