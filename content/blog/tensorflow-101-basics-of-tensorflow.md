---
title: "TensorFlow 101 : Basics of TensorFlow"
slug: "tensorflow-101-basics-of-tensorflow"
date: "2019-01-19"
excerpt: "Hola Ambitious ML lovers! Today’s post is actually for beginners who are looking forward to exploring the horizons of Machine Learning…"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/tensorflow-101-basics-of-tensorflow-8db5e34b3065"
featured: false
readingTime: 5
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/tensorflow-101-basics-of-tensorflow.png"
---

Hola Ambitious ML lovers!
Today’s post is actually for beginners who are looking forward to exploring the horizons of Machine Learning, Deep Learning or Artificial Intelligence. If you want to go deep, you need to get your basics straight. That is what I always believe. So if you agree with me, go ahead and read this post :)

### What is TensorFlow?

TensorFlow is an open source library developed by Google Brain Team for high-performance numerical computations. It can be used in many use cases involving Machine Learning(ML) and Deep Learning(DL). One may argue that using TensorFlow to ML is a bit of a resource wastage, but for DL it is one of the best. TensorFlow makes the Deep Learning easy and accessible to developers and researches by omitting the need to develop things from ground level (well, it is actually the purpose of any library to make things easy).

Of course there are alternative competitors for TensorFlow like Pytorch, MXNet,Theano, Chainer etc. But with regards to forums, resources and number of users, TensorFlow is still leading in number one.

### Why TensorFlow?

- Open source
- Support Both CPU and GPU computations
- Faster compilation time compared to other libraries
- APIs available in Python, C++, JavaScript, Java, Go and Swift ( However, languages other than Python are not yet covered by the [API stability promises](https://www.tensorflow.org/programmers_guide/version_semantics).)

I guess it is enough with background stories. We will move on to the main concepts of TensorFlow; Tensors and Graph.

### Tensors

In simple terms, Tensor is a multi-dimensional array of numbers that is used in TensorFlow for computations. Number of dimension can be zero, one, two… so on. This dimension is sometimes also called as Rank. I will explain more with some examples.

- Rank 0 : Scalar ( Single Value — Ex: a= 102)
- Rank 1 : Vector ( 1D array — Ex: a = [1,2,3] )
- Rank 2 : Matrix ( 2D array — Ex: a = [1,2][3,4] )
- Rank 3 and above : Tensor

### Graph

TensorFlow has a different programming paradigm than other similar libraries. The main concept behind it is called as a ***“Graph”***. First we build (or rather write) the “Graph” and then we execute the ***“Graph”***. So what is this Graph exactly? Well, it is actually simple. Graph is a collection of multiple operations (***“Nodes”***). Operations can be taking inputs, processing or performing some calculation, giving output etc. With just words it will be hard to understand, so let me explain with an example.

Consider function F , F(a,b,c) = 5(a+bc):

If I show it with a visual TensorFlow Graph, it will be like bellow.

![](https://cdn-images-1.medium.com/max/800/1*oxVnir_E3UCuZxKHOkQheQ.jpeg)

f(a,b,c)=5(a+bc) in a visual graph

Each circle in this graph is an operation (“Node"). I think now you got my point. Let me move on to coding, so that I can expose you to the concepts of “building the graph", “running the graph" and “Variable types”.

![](https://cdn-images-1.medium.com/max/800/1*l1TMeQh8vz6B8qzO1HagSA.png)

Code of the above function

Lets have a code walk through and discuss the above mentioned topics. As you can see, we first have to import the TensorFlow. “tf" is sort of the industry standard, however there is no hard-fast rule that you need to stick to that.

In next step, I have taken the three inputs. As you can see those 3 inputs are in different variable types.

1. Placeholder
2. Variable
3. Constant

#### Placeholder

Placeholder is a variable that is not assigned in the graph build stage. It acts as a placeholder (so that’s where the name “Placeholder” came from) which is reserved to capture inputs usually from a data set, random number generation or user input. When initializing we have to specify the data type of the placeholder. There are two more optional features that can be specified; name and shape. Shape is actually the dimensions. By the way, notice the syntax of placeholder coming with a simple “p".

#### Variable

Variable is a changeable value which is assigned within the graph build stage either directly or as a result of a calculation (similar to the concept of variable in any programming language). Mentioning the data type is actually optional. Notice the capital “V" in the syntax.

#### Constant

Constant is a fixed value which is assigned within the graph build stage. (similar to the concept of constant in any programming language). In here also mentioning the data type is optional. There are few other optional features to initialize like shape, name and verify\_shape. Notice the simple “c" in the syntax.

Okay. Since now you know the types of variables, lets move on with the code.

In the next line you can see the calculation. Mind that I did these steps one by one in the visual graph, but here I wrote it in one line. Both ways are correct. So in the code, “f" denote the ***final step*** in the operations. Which mean it is the final step in the graph. So now at this point we are done with creating the graph.

Next we need to run the graph. For that we need TensorFlow Session. It encapsulate the operations’ environment (graph). We initialize the Session object as sess ( sess is just the industry standard name. You can change if you want ) and in the next two lines we run this session. First to initialize all variables and then to run the graph. Note that to run the graph, we need to run the ***final step*** of the graph, in our case “f”. Since we used a placeholder, we should feed a value to it before running the graph. For that `feed dict={a:2.0}` part is added. If "a" is a variable/constant, instead of being a placeholder, you can just run the graph with `sess.run(f)`.

Wolah! We are done with Tensorflow basics. I hope it is simple and understandable. By the way, knowing basics is not enough. Get your hands dirty with coding! Also let me know how this article is 🙈 See you soon with another article.

**Happy Coding!**

> Note: This is a very high level article which helps you to get started with coding quickly. But if you want to learn more deep, there is a nice article by [Dominic E.](https://medium.com/u/6317765dd4e6) (Link: <https://medium.com/@d3lm/understand-tensorflow-by-mimicking-its-api-from-scratch-faa55787170d>)
