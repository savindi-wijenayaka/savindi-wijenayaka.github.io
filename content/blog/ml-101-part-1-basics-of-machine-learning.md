---
title: "ML 101 (Part 1) : Basics of Machine Learning"
slug: "ml-101-part-1-basics-of-machine-learning"
date: "2019-01-26"
excerpt: "Hola Ambitious ML lovers! Today’s post is also for beginners who are looking forward to dive head straight into Machine Learning."
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/ml-101-part-1-basics-of-machine-learning-1734836696c1"
featured: false
readingTime: 8
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/ml-101-part-1-basics-of-machine-learning.png"
---

Hola Ambitious ML lovers!
Today’s post is also for beginners who are looking forward to dive head straight into Machine Learning.

Lets imagine the time you were in grade 5, but you accidentally go and sit in the Advance Level class. Will you understand what the teacher is saying? 😅 It is like that in this field too. If you are a beginner and you go and read first about Convolutional Neural Networks (CNN), you will not make the heads and toes, unless you are an exceptional case. So that is why you should start with basics. This post will give you the overview (Helicopter View) of Machine Learning. Following are the topics covered

1. What is Machine Learning
2. Steps in Machine Learning
3. Generative vs Declarative algorithms
4. Types of Machine Learning

Along the way I will introduce most needed terms of Machine Learning as well. So I hope you will enjoy reading this 😊

### What is Machine Learning

Even though concepts like Machine Learning, Artificial Neural Networks, Artificial Intelligence etc. comes to the surface in recent past, those concepts have a history that runs back to early 20th century. Even this term “Machine Learning” was first introduced by Arthur Samuel in 1959. It is a subset of Artificial Intelligence.

Like it term suggest, we are making the machine learn to do certain things; it can be to identify objects, answer questions, detect the topic of a given content, so on and so for. For teaching the machine, we use mathematical concepts, algorithms and Statistical models. Seems too simple for a definition? ;) Let me tell it with bit of technical terms:

> “A computer program is said to learn from experience *E* with respect to some class of tasks *T* and performance measure *P* if its performance at tasks in *T*, as measured by *P*, improves with experience *E*.

> — Tom M. Mitchell”

Let me give a small example. Think of you as a well experienced house seller. With your experience, you know by the look of a house, how much it will worth. It is because with your experience, you are mentally analyzing “***features***” of the house, like area, number of stories, easy access to crucial utilities etc. Now, you are going to hire a fresh and young employee who has no experience for doing this estimations. He won’t be able to do it, isn’t it? So now you think of making a program to help that young junior to estimate the value of houses. What you do is you take all past data of your sales, with prices and features of each house and feed it to a certain algorithm. Bingo! It start giving you the house values.

This is a simple use case I used to introduce the basic steps involving machine learning; let me visualize it in a visual graph:

![](https://cdn-images-1.medium.com/max/800/1*dEJfdXtxZ7rGwXfp15E6ZA.png)

Steps related to Machine Learning. There might be additional steps coming and some steps removing according to the use case. This is just the generic idea)

### Steps in Machine Learning

#### 1. Objective Setting

First we need to understand the requirement of the machine learning model and derive at the objectives of it, like in any other software.

#### 2. Collecting Data

For Machine Learning tasks, we need something special called “***Data Set***”. It is set of old and already available information (like the past sales details in above scenario), which we can use to give experience to the machine. Usually in Data Sets we have two main components; “***Features***” and “***Labels***”. Features means the characteristics that need to be considered by the model to give the expected output “***Labels***”. So you can simply think of features as the Inputs to the model. On the other hand, “Labels” tell us what is the expected prediction from the model. If the model predicted label matches the label in the data set, the prediction is correct. For example, in above scenario, the value of the house is the “***Label***” in the data set.

![](https://cdn-images-1.medium.com/max/800/1*szf1hx_jMmMvhmD5iMymAg.png)

Example of features and labels in the above discussed scenario

#### 3. Cleaning Data

Sometimes we cannot use the data sets as it is. There can be missing features, extra features, repeating “***examples***” (a particular instance of data) etc. In another scenario, we might need to translate or adjust the data according to the model’s need. For these cases, we need to do scaling, clipping/capping, binning etc. to clean data.

#### 4. Select Algorithm

Algorithms in Machine Learning comes under two main categories.

- ***Generative Algorithms***

These algorithms try to model individual classes out of the data set according to the features identified. consider an example of automated hand-written digit identifier. Generative algorithms model 10 classes of features out of the data set and save them. when a new input of hand-written digit comes, it takes the features of the input and analyse those with every class. Best matching class will be the label of the hand-written digit.

Ex: Neural Networks

- ***Discriminative Algorithms***

These models tend to learn (hard/soft) boundaries between classes. In a scenario like automated hand-written digit recognition, it will take the input features and derived at a point in a feature graph. Then it look at the position of that point. If it in the boundaries of digit “1”, the model consider the newly arrived hand-written digit is 1.

Ex: Support Vector Machine (SVM)

![](https://cdn-images-1.medium.com/max/800/1*XNfveEsJ_OPP21xfs13N5Q.png)

Discriminative vs Generative Algorithms (image source : <http://www.evolvingai.org/fooling>)

The selection of which algorithm to use is purely use case based.

#### 5. Train — Evaluate — Tweak Cycle

After selecting the algorithm and developing it, you end up in a model for your use case. Our next step is to train it. We use our cleaned data set for this purpose. After training we need to evaluate the model. For that also we need the data set. But if we use the same data set again, it will give the evaluation as 99% accuracy because of “***Over Fitting***”(Over fitting happens when model remembers exact same values from before). So best practice in Machine Learning is to divide the data set into 3 sets; Training Set, Evaluating Set, Test Set. You can then train the model with training set and evaluate it with evaluation set. Then you can compute the “***Loss***” (In simple words, deviation of predicted output from the actual output.) If loss is high, re-adjust the model parameters (tweak) and train again. Continue this cycle till the measurement of success of the model is in an acceptable level.

#### 6. Test

Now you can take the third split of the data set and use it to get the predictions. Depending on these predictions, we calculate Measurements of success like “***Accuracy”***, “***Precision***”, “***Recall***”, “***F1***” etc. (We will discuss what they are in a later post)

Okay!! Now we have gone through all the major steps in Machine Learning! We are almost at the end of this post. But there is one more very important concept to discuss. That is types of Machine Learning.

### Types of Machine Learning

There are three major types of Machine Learning in the world currently.

#### **1. Supervised Learning**

Supervised learning happens when we use a data set ***with labels*** to train the model. These labels or desired outputs are also being known as “***Supervisory Signal***” in the machine learning world since it supervise the model, this kind of output is expected when these kind of inputs are given.

Ex: Remember the first example I used in the post about house prices. There we are using past house prices and their features to train the model. So it belongs to Supervised Learning.

**Algorithms used in Supervised Learning:**

- Linear Regression
- Logistic Regression
- Support Vector Machine (SVM)
- K-Nearest Neighbour (KNN)
- Decision Trees
- Naive Bayes

#### 2. Unsupervised Learning

Unsupervised Learning happen when we are using a data set ***without labels*** to train a model. It is up to the model to identify commonalities of data and presence or absence of those commonalities to derive at classes.

Ex: Think that you take cricketer profiles. We take the number of runs scored and wickets taken by each player. We feed these data to our model. The model consider the runs and wickets and categorize players as batsmen, bowlers and all-rounders.

**Algorithms used in Unsupervised Learning:**

- Clustering
- Anomaly Detection
- Neural Networks
- Expectation Maximization Algorithm (EM)
- Principle Component Analysis (PCA)
- Independent Component Analysis

#### 3. Reinforcement Learning

Most blooming and trending type of Machine Learning type currently. It attracted huge attention when Googles DeepMind AI beat the Go (a famous board game) world champion Ke Jie in May 2017. It is a mechanism that highly mimic the human behaviour. What it does is do certain action for which it receives a feedback and with that feedback, it corrects itself. So the next action it does is more better than the previous.

Ex: Think of an infant. He does not know that fire is dangerous. He touches it and burn himself. But he also learn fire can burn him. Next time he only take hand near to fire, but does not touch. Still the heat burn him. Then he understand even too close is not good with regards to fire. If we relate this to Machine Learning, our system is like this infant. It is called as “***Agent***”. The fire is the “***Environment***” and the feeling of burning is similar to “***Feedback***”

In the scenario of a game, AI learns from each of its’ mistakes. That is how it improves itself and reach the capability of beating the humans.

![](https://cdn-images-1.medium.com/max/800/1*wjVxXtXZ3osattBFqsYToA.png)

Reinforcement learning in a simple diagram (Image Source: <https://en.wikipedia.org/wiki/Reinforcement_learning>)

Hooray! We are done with Machine Learning Overview. I hope it is simple and understandable, although it is slightly dragged more than I expected. Also let me know how this article is 🙈 See you soon with [part 2](https://medium.com/javarevisited/ml-101-part-2-linear-regression-gradient-descend-cost-58950ae85301) with coding examples included!
