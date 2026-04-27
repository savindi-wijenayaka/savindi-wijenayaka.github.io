---
title: "All about Convolutional Neural Networks (CNNs)"
slug: "all-about-convolutional-neural-networks-cnns"
date: "2021-06-06"
excerpt: "Hola Readers!"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/all-about-convolutional-neural-networks-cnns-172425c2cce4"
featured: true
readingTime: 20
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/all-about-convolutional-neural-networks-cnns.jpeg"
---

Hola Readers!

Today I come to you with yet another interesting topic in Deep Learning; Convolutional Neural Networks (CNN). Even though this topic should ideally come after discussing lots of other [Machine learning](https://medium.com/javarevisited/10-free-machine-learning-courses-for-beginners-181f83b4c816) and [Deep Learning](https://medium.com/javarevisited/top-5-advanced-deep-learning-and-neural-network-courses-to-learn-in-2020-a273f5eddca5?source=---------16----------------------------) theories, I decided to go ahead and write this article. However, I tried my best to introduce all the terms I used and also to explain things in detail so that you can understand everything even without previous knowledge in the field.

Today’s discussion outline is as follows;

1. What is CNN?
2. What we can do with image data?
3. Convolutional Layer and Feature Detectors
4. Padding and Dimensions
5. Pooling Layer
6. Flatten Layer
7. Fully Connected Layer
8. Convolutions on RGB images
9. Summary of Notations and Equations
10. Transfer Learning
11. Why CNN and not ANN?

Without further ado, let's dive right in. (I have a feeling this will be a bit longer post but I guarantee I will keep it interesting.)

### 1. What is CNN?

![](https://cdn-images-1.medium.com/max/800/1*Mva6HPQtipyHVQ28VZslww.jpeg)

Image 1: Ecstasy of the lilies by Octavio Ocampo (Source: Google)

What did you see in the above picture? Lilies or a young girl? I’ll take both answers as correct. This is one of the famous optical illusion arts in the world. So how did it trick you?

The human brain recognizes content in an image using features (known shapes) it identifies. It does not look at the entire image. For example, we can see lily petals forming eyes, nose, mouth kind of shapes in the above image. Therefore, our brain sees the image of a young girl, even though there is none in the picture.

Similarly, when given an image, CNN uses feature detection to identify and to decide on the final output.

Since I started off with what actually CNN does, let me give you a brief history of it as well. Convolutional Neural Networks (Shift-invariant or Space-invariant ANN), in short CNN, is a special type of ANN (Artificial Neutral Network) introduced to the world by Yann LeCun (Also known as the Godfather of CNN) and Yoshua Bengio, back in 1995. Even though CNN is well known for its contribution to [Computer vision](https://medium.com/javarevisited/5-best-computer-vision-courses-for-beginners-85f901a8f88a), it caters to many other application domains like recommendation systems, natural language processing, and financial time series.

Its specialty lies in its capability of successfully capturing the Spatial and Temporal dependencies in an image through the application of relevant filters. This is the reason why it performs well in time series data and digital signal data, apart from image data.

Even with image data, it is not only about finding the image that contains a cat or a dog, a.k.a. image classification. There are few more things we can do using images.

### 2. What we can do with image data?

![](https://cdn-images-1.medium.com/max/800/1*2RXyBGtjJm3QHXqsTPBMTw.png)

Image 2: Different sectors of image processing (Source: Google)

- ***Image classification***: Given an image, identify which class it belongs to. This is done for single object images.
- ***Object localization***: This helps us to identify exactly where the object is present in the image given to it, by drawing a **bounding box** around the object.
- ***Object detection***: When multiple objects are present in a single picture, that belongs to a single class or multiple classes, object detection try to identify all of them and their respective classes. In most cases, localization also used alongside this.
- ***Instance segmentation***: This can happen either when a single object is present or when multiple objects are present. What it does is identifies which pixels actually belong to that identified object. This means this can draw an outline around the identified object. Segmentation is highly used in medical image processing.
- ***Landmark detection***: Landmarks are the point of interest in an image. For example, if the image contains a face, landmarks will be around eyes, nose, mouth, eyebrows, jawlines, etc. This section of image processing looks at the detection of such landmarks. This is heavily used in emotion and gesture recognition.

![](https://cdn-images-1.medium.com/max/800/1*r9fMs5gELVGkOsBkypag2Q.jpeg)

Image 3: Landmark Detection (Source: [arxiv.org](https://arxiv.org/pdf/1803.04108v4.pdf))

Since we now know what we can do using image data, let's dig bit deeper into CNNs, with respect to different types of layers and their responsibilities

When it comes to CNN architecture, there are several types of layers available. Although how many layers we use and which combination of layers we use will result in various levels of performance, the concept of these layers in all CNN architectures is the same.

![](https://cdn-images-1.medium.com/max/800/1*D3wClKuUDyXfFKbb1cN8Bw.jpeg)

Image 4: Types of layers in CNNs and their general order (Source: *Image by author)*

### 3. Convolutional Layer and Feature detectors

Inside the convolution layer, there are two major things happening;

1. Application of the ***convolution operation*** between the input and the feature detector.
2. Application of the ***activation function***.

First, let's look at the convolution operation. When applying it between the input and the feature detector, it will result in a feature map for the particular layer. Let's have a look at how that happens, step by step.

![](https://cdn-images-1.medium.com/max/800/1*nrdE5Bcz3T-r4gF2NFmOQg.jpeg)

Image 5: How feature detector works (Source: *Image by author)*

Step 1: Element-vise multiplication of the feature detector and current window at the position [0,0] will result in a sum of zero. Hence first value in the resulting feature map is zero.

Step 2: Since the ***“stride”*** (how many positions we slide the window before performing the next convolution operation) I have used in above example is 1, the window will shift 1 position to the left and end up in [0,1] starting position.

Step 3: Element-vise multiplication of the feature detector and current window at the position [0,1] will result in a sum of one. Hence second value in the resulting feature map is one.

Step 4: These steps (i.e. striding and performing convolution operation) will repeat until the window slides over the entire image and reach the final pixel.

Even though I explained the internal mechanism with a single feature detector, we usually use multiple feature detectors in practical use-cases. These multiple feature detectors are capable of identifying different aspects/qualities of the given image. For example, let's look at how the feature detector can detect an edge. In image 6, you can see how the final feature map have high color contrast between the pixels with the edge and around the edge. This way the edge is more emphasized and makes it easy for the computers to *see*.

![](https://cdn-images-1.medium.com/max/800/1*4SrnLYkRTzxNnEmnB7MBYw.jpeg)

Image 6: How edges are emphasized by an application of a edge filter (Source: *Image by author)*

There are defined filters like the edge detector filter I used above and there are learnable weight filters as well. The one used in CNNs is learnable weight filters.

![](https://cdn-images-1.medium.com/max/800/1*3bzuhM7-ii5A5aw2naqd2w.jpeg)

Image 7: Different types of filters (Source: *Image by author)*

When we want to build a CNN, what we do is to define the size of the feature detector (commonly known as kernel size) when we create the Convolution layer. At first, the values in the feature detector will be initialized to random numbers (if you are using keras you can use `kernel_initializer`). Then we use error calculations and back-propagation of the errors to update these numbers to find the most suitable values for each feature detector. The final values after training completes will be different from one feature detector to another.

> Note: Usually the kernal size is a odd number like 3x3, 5x5, 7x7

After the convolution operation, there will be an activation function applied on the derived feature map to increase the non-linearity of the final feature map. You may be thinking why we need to do that. Think of it this way; a neural network without an activation function will be like another linear regression model. In other words, activation functions make the neural network capable of producing non-linear decision boundaries via non-linear combinations of weights and inputs. This makes them capable of learning complex relationships between inputs and outputs. In the world of CNN, we consider applying of activation function as a part of the convolutional layer, not as a separate step.

From the `image 5` of this article, you can see that the dimensions of the input shrink when it goes through the layers. Sometimes we need this behavior but sometimes we don’t. So it is important to know how and when we should think about this aspect. Lets have a look at it in the next section.

### 4. Padding and Dimensions

When applying a feature detector, the resulting feature map gets shrunken compared to the actual dimensions. For a shallow [neural network](https://javarevisited.blogspot.com/2019/08/top-5-courses-to-learn-deep-learning.html), this might be acceptable behavior. For example, we require this behaviour if we need to lower the dimensions going into dense layers, so that we can avoid high number of trainable parameters.

But in other cases, this is a behaviour we need to avoid. Especially in the case of deep neural networks where there are lots of hidden layers, if we shrink the image continuously, it will disappear at one point, or else, the later layers will not have enough information to learn from. This is when padding becomes very important. It also helps to avoid information loss from the edges of the image.

Padding is coming as a part of the convolutional layer. There are two main types of convolutions when it comes to padding. (These are the ones used with libraries such as [Keras](https://medium.com/javarevisited/5-best-pytorch-and-keras-courses-for-deep-learning-in-2021-c9ba377b1170). Apart from these two, there are few more such as Causal padding, Constant padding, Reflection padding and Replication padding. However, I will not talk about them since these are rarely use. If you want to read more on them, refer this [link](https://www.machinecurve.com/index.php/2020/02/07/what-is-padding-in-a-neural-network/#types-of-padding))

#### 1. Same Convolutions:

In this approach, padding is included to make the ***output size equal to input size***, hence called “same” convolutions.

If input size is `n x n`, filter size is `f x f`, padding `p` and stride `s`; then the output dimensions are derived by the equation: `⌊ (n+2p-f)/s + 1 ⌋ x ⌊ (n+2p-f)/s + 1 ⌋`.

Since this output dimension should be equal to n x n, we can find out the padding size needed;

```
(n+2p-f)/s + 1 = n
             p = 1/2 [n(s-1) + f-s]
```

For example, if the input is 5x5 in the same convolution, when 3x3 filter is used with stride 1; the padding used is:

```
p = 1/2 [n(s-1) + f-s]
  = 1/2 [5(1-1) + 3-1]
  = 1/2 [2]
  = 1
```

![](https://cdn-images-1.medium.com/max/800/1*JdJdQmxiq1NkxF2nxwIeZA.gif)

Image 8: Same padding convolution (Source: [github/vdumoulin](https://github.com/vdumoulin/conv_arithmetic))

#### 2. Valid Convolutions:

In short, this ***does not use any padding.*** If we consider the same notation in the above example; the output dimensions of a valid convolution will also be derived with the equation: `⌊ (n-f)/s + 1 ⌋ x ⌊ (n-f)/s + 1 ⌋`.

For example, if the input is 4x4 in a valid convolution when 3x3 filter is used with stride 1; the output size will be:

```
output = ⌊ (n-f)/s + 1 ⌋ x ⌊ (n-f)/s + 1 ⌋
       = ⌊ (4-3)/1 + 1 ⌋ x ⌊ (4-3)/1 + 1 ⌋
       = 2 x 2
```

![](https://cdn-images-1.medium.com/max/800/1*cFMF_uWgUFdVRMZAZ0Bfzg.gif)

Image 9: Valid padding (Source: [github/vdumoulin](https://github.com/vdumoulin/conv_arithmetic))

With that clarification on padding and handling dimensions, we can conclude the discussion on the convolutional layer and move on to our next player; Pooling layer!

### 5. Pooling Layer (Down sampling)

Imagine a cat image. The cat will be lying down, sitting, running or in any other different poses. But despite its pose, our model should be capable of identifying that it is indeed a cat. If we articulate the scenario in more general terms; despite the angle, rotation, size, or the pose, our model should be capable of identifying the object that we try to detect. This is referred to as ***Spatial Invariance*** or ***Shift Invariance*** in Computer vision.

The method we use for this has its origins in signal processing, where lower resolution signal is created by omitting too many fine-grained details of a higher resolution signal. However, this lower resolution signal is still capable of displaying the essential elements of the signal.

Similarly, in CNN, we use downsampling (i.e. pooling) not only to achieve Spatial invariance, but also to **reduce the dimensions going into successive layers** (so that we can cut down on computational expense) and to **avoid over-fitting**.

In CNN world, there are 4 major types of pooling.

1. Max pooling: Maximum value in the selected window is taken as the corresponding value.
2. Average/Mean pooling: Average value is calculated for the selected window and taken as the corresponding value.
3. Min pooling: Minimum value in the selected window is taken as the corresponding value.
4. Sum pooling: Total value is calculated for the selected window and taken as the corresponding value.

Out of those, the most commonly used one is the Max pooling with 2x2 filter of stride 2. It is also the one that was recommended by lots of research papers. It is capable of generating a feature map half the size of the input feature map. The other famous one is Average pooling.

![](https://cdn-images-1.medium.com/max/800/1*AqG7-knPPcnInDs-j0NwWA.png)

Image 10: Max pooling and Average pooling with 2x2 pool size and stride 2 (Source: [researchgate](https://www.researchgate.net/figure/Illustration-of-Max-Pooling-and-Average-Pooling-Figure-2-above-shows-an-example-of-max_fig2_333593451))

Calculating the resulting feature map dimension is easy with the same equation we used for the convolution layers. i.e. `⌊(n+2p-f)/s + 1⌋`. Therefore, you can prove the dimensions of the above pooling operation (image 10) like this:

```
n_out   = ⌊(n(in) + 2p  -f)/s + 1⌋
        = ⌊(4     + 2*0 -2)/2 + 1⌋
        = 2
```

Important thing to note in pooling layers is that, all parameters of the filter are specified. i.e. all are hyper parameters, no training parameters. Also in pooling, no padding is usually used.

> There is no hard fast rule in how many convolution and pooling layers to be used, nor there is any hard fast rule that you have to use them in sequential manner. There are many famous CNN architectures which used creative combinations and sequences to achieve finer results, like ResNet, InceptionV3 etc.

### 6. Flatten Layer

This layer has the most simple logic of all. Its purpose is to “flatten” the feature maps resulted from prior layer, to a single column-like vector which is 1-Dimensional, so that it can be then fed into an Artificial Neural Network (ANN) to generate predictions.

![](https://cdn-images-1.medium.com/max/800/1*z3uNs4EscLv02AcNCTUNzw.jpeg)

Image 11: Flatten Layer (Source: *Image by author)*

### 7. Fully Connected Layer (Dense Layer)

Dense layer or the Fully connected layer is the one that usually do the analysis over the extracted features of the prior layers. As the name suggest, all units in this layer is connected to all the activation units of the prior layer and the layer that comes after (if there is any). Dense layer is similar to an ANN, hence produce the final prediction using softmax-like functions.

So lets have a look at how this work, with respect to an image classification task;

![](https://cdn-images-1.medium.com/max/800/1*Prp2RWYIvO8cuVfGkAEyzA.jpeg)

Image 12: How dense layers do the predictions (Source: *Image by author)*

If there are more than 2 classes, number of neurons in the final dense layer will be equal to number of classes in the given task. However, in the case of binary classification, we can simply use one neurons. (Here I used 2, just to articulate the idea in a multi-class scenario)

Over time, with the help of labeled data, output neurons learn which voting neurons give higher weights for the label that output neuron is responsible for. Hence, the output neurons learn to pay more attention to those voting neurons.

When unlabeled data (i.e. test data) comes in, depending on which voting neurons show higher weights, the relative output neuron gives higher probability. In the end, we can observe these probabilities and decide the highest probability as the final class prediction.

With this we comes to an end about the layers in CNN. But let me quickly brief you about few more things about CNN and image processing.

### 8. Convolutions on RGB images

All these images I presented to you in above sections were drawn considering a single channel (i.e. black and white images). So what if we have a color image? How will the CNNs work then? Lets look at these questions in this section.

When you say you have a colour image, that mean you have three colour channels. Red, Green and Blue (RGB images). In such case, you have to use 3 separate filters which are dedicated to each channel. These can be either the same filter (common case), or you can use different filters if you want to. The final convolution value is taken by summing up all 3 channel values. That is why the final output is having 1 channel.

![](https://cdn-images-1.medium.com/max/800/1*Lz41Awu2VnR0JB9R_LwDng.jpeg)

Image 13: Logic of handling multiple colour channels with a single filter (Source: *Image by author)*

If set of multiple filters are used for all channels, the the final output will have set of feature maps, stack together. Image 14 articulates this scenario more visually. If you look at the dimensions of the final feature map, the z corresponds to the number of filters we used.

![](https://cdn-images-1.medium.com/max/800/1*fFep5PES3pVNVF7W63hpbA.jpeg)

Image 14: Working with multiple filters when using a RGB image (Source: *Image by author)*

### 9. Summary of Notations and Equations

I used the simplified version of traditional notations of CNN literature in those above sections. I will summarize them in here for multi layer scenario, along with some common equations, so that it is easy for you when you refer research papers.

![](https://cdn-images-1.medium.com/max/800/1*NiLkMvuuhDGxobak-DZwKQ.png)

Image 15: Notations used in Equations with multiple layers (Source: *Image by author)*

![](https://cdn-images-1.medium.com/max/800/1*xKrozH5l0IY30ybnTL7ZZA.png)

Image 16: Dimension for different parts in layer l using the above notation (Source: *Image by author)*

![](https://cdn-images-1.medium.com/max/800/1*Sb9nE2nAaUWB_9NR8vjovg.png)

Image 17: Equations used in this post (Source: *Image by author)*

Lets explore these notations and equations with 2 examples:

![](https://cdn-images-1.medium.com/max/800/1*JQvIyqCk3n8JkR4yk6pvaA.jpeg)

Image 18: Example 1 — CNN without pooling and padding (Source: *Image by author)*

In image 18, you can see the image used is an RGB one. Therefore, the first filter’s dimensions will be `3x3x3`. So what is the meaning of `n_c = 10` then? That is how many filters where used. In short, the first convolution layer uses ten `3x3x3` filters. You can see the connection between the number of filters and the output feature map dimension marked in green in image 18. So lets find out the `n[1]` together, using the output dimension equation we discussed in the image 17.

```
n[1] = ⌊(n[0] + 2p -f)/s + 1⌋
     = ⌊(39 + 0 - 3)/1 + 1⌋
     = 37
```

The logic is the same for the successive 2 layers. So lets find out them as well.

```
n[2] = ⌊(n[1] + 2p -f)/s + 1⌋
     = ⌊(37 + 0 - 5)/2 + 1⌋
     = 17
```

```
n[3] = ⌊(n[2] + 2p -f)/s + 1⌋
     = ⌊(17 + 0 - 5)/2 + 1⌋
     = 7
```

> Note: When you go deeper into the network, usually `n_h` and `n_w` goes down while `n_c` goes up.

Lets calculate the number of learnable parameters for all 3 layers:

```
learnable params layer l = (f[l] x f[l] x n_c[l-1] + 1) x n_c[l]
```

```
learnable params l[1]    = (f[1] x f[1] x n_c[0] + 1) x n_c[1]
                         = (3 x 3 x 3 + 1) x 10
                         = 280
```

```
learnable params l[2]    = (f[2] x f[2] x n_c[1] + 1) x n_c[2]
                         = (5 x 5 x 10 + 1) x 20
                         = 5020
```

```
learnable params l[3]    = (f[3] x f[3] x n_c[2] + 1) x n_c[3]
                         = (5 x 5 x 20 + 1) x 40
                         = 20040
```

Lets check another example with pooling:

![](https://cdn-images-1.medium.com/max/800/1*5rWffgJWC8ulCEnJD_IDxw.jpeg)

Image 19: Example 2 — CNN with pooling but no padding (Source: *Image by author)*

You can also calculate the trainable parameters like in the example 1. But important thing to remember is that, like I mentioned in the pooling section, ***during the application of pooling, there is no trainable parameters***.

### 10. Transfer Learning

Although this topic needs a different post talking about it, I decided to give you a quick glance on what it does, so that it is easy for you to have the helicopter view of everything related to CNN and image processing.

Transfer Learning is a concept in the [Machine Learning](https://medium.com/javarevisited/10-best-coursera-certifications-courses-for-machine-learning-and-artificial-intelligence-256d9a125822) and [Deep Learning](https://medium.com/javarevisited/10-free-deep-learning-courses-for-beginners-37b5de61f8dc) domain where it looks at the possibility of using stored knowledge of solving one problem in solving another different, yet related, problem. For example, if a model is trained to identify cats correctly, the knowledge that the model gained with regarding this classification task, can be used to identify cars correctly, after small number of iterations on fine-tuning. The motivation behind this approach is driven by the practical difficulties in data gathering related to each domain and hardware or infrastructure limitations faced by ground-level researchers who works with normal computers and without grants.

![](https://cdn-images-1.medium.com/max/800/1*b4GiiiIgxhfd3pUd86ZUuw.png)

Image 20: Traditional ML vs Transfer Learning (Source: [TowardsDataScience](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a))

![](https://cdn-images-1.medium.com/max/800/1*8yOSgO5rAc6TLXz0Z8J09g.png)

Image 21: Idea of Transfer Learning (Source: [TowardsDataScience](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a))

To read more about Transfer Learning, I would suggest looking into the medium article “[A Comprehensive Hands-on Guide to Transfer Learning with Real-World Applications in Deep Learning](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a)” by [Dipanjan (DJ) Sarkar](https://medium.com/u/6278d12b0682).

Next lets look at why we need CNN and why not use ANN for image processing:

### 11. Why CNN and not ANN?

![](https://cdn-images-1.medium.com/max/800/1*s-hh7JMZRswh6AGTOJg6tQ.png)

Image 22: CNN vs ANN (Source: *Image by author)*

If we use an ANN to train an image which is 32x32x3 (meaning, a coloured image which is 32 pixels by 32 pixels, i.e. the 3 means number of colour channels; RGB — Red, Green and Blue), we need to have a layer with 3072 nodes. If the next layer has 4704 nodes, the total parameters to train will be;

```
3072 x 4704 ≈ 14.5 Million
```

Even though we now have machines that can support this much of computation power, this is just considering 2 layers. Imagine ANN which is having more and more layers and image which is larger like 1024x1024. Then the training parameters will eventually be too large to compute.

The CNN on the other hand handles this situation with a concept called “***Parameter Sharing***”. Because the filter(such as edge detectors) used in one part of the image is actually useful in another part of the image, the model just has to learn the parameters of the filter. Hence, the filter parameters are shared throughout the image with the sliding window. So in the above example, if we used a CNN, we will just have to learn 456 parameters.

Another reason why CNN is preferred over ANN is because of the “***Sparsity of Connections***”. This means, each single output value in the feature map only depends on a smaller subset of the input. Therefore, each activation in the next layer depends on only a small number of activations from the previous layer.

![](https://cdn-images-1.medium.com/max/800/1*oCe-T-cTLLKPl2we81mLXQ.png)

Image 23: Sparsity of Connections (Source: *Image by author)*

The 3rd important reason why CNN is superior is because of its “***Translation Invariant***”. It means, irrespective of the position and orientation of the feature, the CNN will be capable of detecting it and giving it the same single output value. This is achieved because of techniques like feature detectors and pooling layers.

With this, we come to the end of this post, hope you enjoyed it. Leave a comment down below on how it was. If you have any questions, leave a comment, I’ll clarify. Criticisms are also welcome 😉

See you soon with another Post!

Happy Reading!❤
