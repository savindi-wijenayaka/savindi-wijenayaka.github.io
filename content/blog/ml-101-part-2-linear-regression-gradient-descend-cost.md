---
title: "ML 101 (Part 2): Linear Regression, Gradient Descend & Cost"
slug: "ml-101-part-2-linear-regression-gradient-descend-cost"
date: "2019-06-22"
excerpt: "Hola Again!"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/ml-101-part-2-linear-regression-gradient-descend-cost-58950ae85301"
featured: false
readingTime: 11
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/ml-101-part-2-linear-regression-gradient-descend-cost.png"
---

Hola Again!

Today’s post is Part 2 of my Machine Learning 101 post series. You can refer to [Part 1: Basics of Machine Learning](https://medium.com/@phantomgrin/ml-101-part-1-basics-of-machine-learning-1734836696c1), if you have zero knowledge of machine learning, before reading this post.

To take an introduction to today’s topic, I will recall some of the things I mentioned in my previous post, which are related to linear regression.

Using Machine Learning, we can answer 5 types of questions. So all the algorithms in Machine Learning are formed to answer one of these questions. Following are those questions and their related algorithms:

1. How much or how many? → ***Regression Algorithms***
2. A or B? → ***Classification Algorithms***
3. How is this organized? → ***Clustering Algorithms***
4. Is it weird? → ***Anomaly Detection Algorithms***
5. What should I do next? → ***Reinforcement Learning Algorithms***

Most of the time, question 1 and 2 based algorithms are coming under Supervised learning, while 3 and 4 come under Unsupervised learning. (Check out more about supervised, unsupervised and reinforcement learning in [ML 101: Part 1](https://medium.com/@phantomgrin/ml-101-part-1-basics-of-machine-learning-1734836696c1))

So now let's take a look at Linear Regression. As the name suggests, Linear Regressions comes under the Regression Algorithms. It answers the question of ‘***how many***’ or ‘***how much’***.

To discuss the topic, let's take an example scenario: We are going to measure the relationship between the number of hours exercised and the number of Calories burned. (Assume calories are in kilojoules). Since Hours is the independent variable, it comes as the X-axis, while calories come as Y-axis (Dependant variable).

![](https://cdn-images-1.medium.com/max/800/1*KT3Ed3LpY-zf0ZqY4gMnKg.png)

Table with x and y coordinates

If we plot this in a scatter plot, we will get something like below:

![](https://cdn-images-1.medium.com/max/800/1*TNRTE5nhcVPORIf-Xpa-iw.png)

Points of the above table in a scatter plot

In here, blue diamonds depict the actual values which were mentioned in the above table.

So what if someone tells the number of hours they work out, and asked you how many Calories were burn approximately? This is when we come across the need for a mechanism to predict the Calories depending on hours. One of these mechanisms is linear regression.

In Linear Regression, what we do is to find the best-fit line, so that, we can predict the value for a new `X`, using that line.

From school level mathematics, we know the equation of a line: y=mx+c. It is the same for linear regression. What we do is, systematically find out this “m" and “c". From that, we determine the best-fit-line or the y^ (y hat)

> y^ = mx + c

Lets go ahead and see how we can calculate the best-fit-line for our above dataset.

The mathematical equation to find `m` in `y^ = mx + c` is:

```
m = ∑ (x-x’).(y-y’) / ∑(x-x’)²
```

So we will expand the above table to calculate this equation as below:

![](https://cdn-images-1.medium.com/max/800/1*SUdlkyBi9BOzyQykclO45g.png)

The calculation for the equation

Now using the above table:

```
m = 6 / 10 = 0.6
```

Great! Now we have to find, c. How can we do that?

There is a very important concept that we need to know when finding c of the above equation. That is, the best fit line should go through the point (A) in which, the lines `x = x’` (mean of x) and `y = y’`(mean of y) crosses each other. Look at the bellow graph for further clarification:

![](https://cdn-images-1.medium.com/max/800/1*WpMRQnfIgVi42BckdEgfeQ.png)

Best-fit-line, x=x’ line and y=y’ line crossing each other at point A

As mentioned above, the point A is a point on all 3 lines; `y^= mx+c`, `y=y’`, and `x=x’`. Therefore, we can calculate the c using that logic (we already know m):

```
y' = mx'+c
```

```
c = y' - mx' = 4 - (0.6 * 3)
c = 4 - 1.8
c = 2.2
```

Therefore, in this dataset, the best-fit-line is:

> y^ = 0.6x + 2.2

Great!! We found the Best-fit line for our dataset! It was pretty easy, isn’t it? But in the actual scenario, the dataset is way more complex than the example I took. Hence, the model cannot easily calculate the Best-fit-line. This is why linear regression happens in an iterative manner. What does that mean?

When the model gets the dataset, in the first iteration, he calculates the `m` and `c` for a random best-fit-line. Then he looks at the “***Error***” or the “***Cost***” of the best-fit-line, using the actual and the predicted values. Then in the next iteration, he again adjusts the `m` and `c` of the best-fit line, to minimize that error. This loop continues over the number of iterations we have mentioned in the model. So it is up to us to fine-tune the model to stop at the best best-fit line equation.

![](https://cdn-images-1.medium.com/max/800/1*iiXz6nV4IQFhJ8uAk2yTnw.gif)

The values of m and c are updated at each iteration to get the optimal solution (Source: [Towards Data Science, 2019](https://towardsdatascience.com/linear-regression-using-gradient-descent-97a6c8700931))

Let's go into more detail on how this actually happens:

As I mentioned before, first, we start off with random m and c values (usually both as zero) and calculate the y^ for those values. In the next step, we calculate the “***Cost***” or the “***Error***” for this line. There are many functions that we can use for this calculation. Those are known as “***Cost Functions***”. One such function is “***MSE***” or “***Mean Squared Error***”.

MSE takes the difference between actual and predicted values, and squares it to avoid canceling out of negative and positive values. Then it sums all these together and divides by the number of data points.

```
MSE = (1/n) ∑ (y-y^)²
```

MSE will be the cost function that I use in this post’s latter parts. However, let me tell you what are other cost functions that are available:

```
SEE = Standard Error of Estimate
SEE = √ ∑(y-y^)² /(n-2)
```

```
MAE = Mean Absolute Error
MAE = (1/n) ∑ |y-y^|
```

```
RAE = Relative Absolute Error
RAE = ∑ |y-y^| / ∑ |y-y'|
```

```
RSE = Relative Squared Error
RSE = ∑ (y-y^)² / ∑ (y-y')²
```

```
CoD = Coefficient of Determination (R²)
CoD = 1 - (∑(y-y^)² / ∑(y-y')²)
CoD = 1 - RSE
```

So now we have selected `MSE` as our cost function. What we do next is to calculate the Cost of the estimated m and c using that cost function. Then we need to do a small adjustment to the `m` and `c` in a way that we can minimize the MSE further, ***if possible***.

Didn’t you wonder why I said: “if possible”? That is because of the graph between `m,` `c` and `MSE` is always curved, like below:

![](https://cdn-images-1.medium.com/max/800/1*uY7sBPjLyytpojJJDqiKyg.png)

The graph between MSE, m, and b (c in our case) [Source: [YouTube, 2019](https://www.youtube.com/watch?v=vsWrXfO3wWw)]

If we take 2 plains at a time and draw this graph, it will give two curved graphs like below:

![](https://cdn-images-1.medium.com/max/600/1*MWM3TJsK2B7bUn-Jc74YPg.png)![](https://cdn-images-1.medium.com/max/800/1*cZ4D3yv9vL3fSeYMLB1KsQ.png)

Graphs between MSE and m and MSE and b (c in our case) [Source: [YouTube, 2019](https://www.youtube.com/watch?v=vsWrXfO3wWw)]

So we need to correctly find the lowest point of the graph. If we take fixed-size steps there is a high chance that we overstep the lowest point. Instead, we need to take steps according to our current position in the graph.

![](https://cdn-images-1.medium.com/max/600/1*uTPo5GOWCx30oPq9lSlUnA.png)![](https://cdn-images-1.medium.com/max/600/1*Xgk6XI4kEcSmDaEAxqB1CA.png)

How moving by fixed sized steps will fail to reach the Global minimum and taking proportionate steps will work in reaching the Global minimum. [Source: [YouTube, 2019](https://www.youtube.com/watch?v=vsWrXfO3wWw)]

So next question comes to mind is, how can we figure out which size step to take and which direction to step. This is when Gradient Descent comes into action.

Think that you are the blindfolded mountain climber in the below image:

![](https://cdn-images-1.medium.com/max/800/1*LsTRB6CZL6DzD1_kotcdFg.png)

Your foot will identify the slope of the hill, whether it is steep or whether it is flat. Depending on that, you will know how big your step should be.

On the other hand, from the direction of the slope, you can guess the direction that you need to step next.

For example, near the toe of the mountain, you will feel the mountain is steep and you will take a huge step upwards to reach the top quickly. Similarly, near the top, you will feel that the slope is almost flat and you will take smaller steps to avoid overstepping.

Like the mountain climber, Gradient Descent also take two things into account when adjusting the `m` and `c`. That is, which direction to go and how big the step should be.

For this, we need to get a measurement for the slope of a point in `MSE-m-c curve graph` at a particular moment. So how can we take the slope? This is when your Advance Level maths knowledge will be important 😋

The slope between 2 points (or a line) is calculated by: →

```
change in y / change in x
= (y1-y2) / (x1-x2)

      → dy / dx
```

Then what about a point? How can we calculate the slope of a point? Both `dy` and `dx` will be zero since both points are exactly the same, isn’t it?

In such cases, we calculate the slope by considering a very small change in y and x (nearly zero). This is denoted by `△y / △x`. We use knowledge of derivatives to calculate this `△y` and `△x`.

Let's have a look at our MSE equation:

```
MSE = (1/n) ∑ (y-y^)²
```

We can write this equation using m and c like below, substituting the `y^` with the equation `mx+c`.

```
MSE = (1/n) ∑ (y-(mx+c))²
```

As you can see, we need to find the relationship between MSE and 2 variables here. That is `m` and `c`. In such a case, we cannot simply calculate the derivative for the whole equation. Instead, we have to calculate the “***partial derivative”*** (∂). The partial derivative is the derivative calculated assuming that all other variables in the equation are zero, except for the one we consider. This means if we want to calculate the partial derivative of the above equation with regards to `m`, we assume that the `c` is zero and calculate the derivative of the equation.

So the partial derivatives of the MSE equation with regards to `m` and `c` is as follows:

```
∂/∂m = (2/n) ∑ -x(y-(mx+c))
∂/∂c = (2/n) ∑ -(y-(mx+c))
```

Now we know which direction to go, to reach the Global minimum. What about the size of the step? this is where the concept of “***Learning-rate***” (LR) comes into action. Learning rate is a fixed value saying how big our correction or the learning should be. LR, together with the partial derivative, gives the total adjustment that we need to do to `m` or `c`, to derive at the next `m` or `c`.

> Even though LR is a fixed value, when multiplied with the partial derivative, it gives a proportionate value depending on the point’s location on the graph.

OK! Now let’s implement this with a simple code. (you can try this with a Jupyter notebook or a Colab notebook)

![](https://cdn-images-1.medium.com/max/800/1*90lOIn59tofmUbnjxspwdw.png)

Code to implement the Gradient descent algorithm ([Code](https://gist.github.com/PhantomGrin/a6ace45009bd893f93ec1ff1e9154f7b))

Output:

```
epoch : 0, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
epoch : 1, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
epoch : 2, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
...
...
...
epoch : 1497, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
epoch : 1498, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
epoch : 1499, m : 0.6000000000000176, c : 2.1999999999999362, MSE : 0.47999999999999987
```

You can see that the calculated `m` and `c` are almost matching to our manually calculated `m` and `c`.

> Note that LR and epochs are values to be finetuned. Initially set the epochs to a low value like 20 and LR to 3 decimal points (for example 0.001). Run the code and see whether the MSE is increasing or decreasing. If increasing make the LR smaller and vice versa if decreasing. After finding the appropriate LR, increase the epochs.

Eureka! We covered everything we need to know about Linear Regression including Cost Functions and Gradient Descent! We also checked on how it is done with code. However, these models have a good history and they have their own implementations using various python libraries. The best practice is to use them instead of manually coding unless you want to experiment with it.

I hope I added something to your knowledge. 😇 Let’s meet soon with next post. Meantime, if you have any doubtful place, or any question, feel free to leave a comment.

Happy Learning! ❤

> PS: If you want to check how Linear regression can be implemented with scikit-learn, check my gist below. 👇

<https://gist.github.com/PhantomGrin/10dc8c7c9a796c91cac386ee779f017e>
