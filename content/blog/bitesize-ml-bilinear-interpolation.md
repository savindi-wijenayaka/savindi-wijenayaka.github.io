---
title: "[Bitesize ML] Bilinear interpolation"
slug: "bitesize-ml-bilinear-interpolation"
date: "2023-06-27"
excerpt: "Hola readers! Since this is my first article in the series, let me give a brief introduction to it."
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/bitesize-ml-bilinear-interpolation-d732b799fc4e"
featured: false
readingTime: 3
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/bitesize-ml-bilinear-interpolation.jpg"
---

Hola readers! Since this is my first article in the series, let me give a brief introduction to it.

In this series, I will talk about different theoretical aspects of ML which I come across while studying; in an understandable but concise manner. Think of it as a short note. They won’t be interconnected, so you can just read one on the go.

Without further ado, let's jump into today’s topic

### What?

A resampling technique that estimates the new pixel value by taking the weighted average of the four nearest pixels, where the weights are based on their corresponding distance.

### How?

Let’s first have a look at how linear interpolation works.

![](https://cdn-images-1.medium.com/max/800/1*sTc1mNFChYM2Q0e_cfEi3w.jpeg)

Linear interpolation (Image by the Author)

For 2D (a.k.a. an image in the image processing or computer vision domain), we have to calculate the linear interpolation twice along the x and y axis; hence the name “Bilinear Interpolation”

![](https://cdn-images-1.medium.com/max/800/1*9Jjeus56BUMesecB9iYXMA.jpeg)

Bilinear Interpolation (Image by the Author)

In step one, we calculate the Iₜ₁ and Iₜ₂ along the x-axis using linear interpolation. Then in step two, we use linear interpolation again on these intensity values to calculate the final Intensity of t. Combining all three equations for Iₜ₁, Iₜ₂, and Iₜ, we can summarize the Iₜ equation using only the four nearest pixels (depicted in red box). Values a and b can be calculated using the coordinates of Iₜ and I₁.

### Example:

![](https://cdn-images-1.medium.com/max/800/1*XG8TzaxTHBdbY1S-ZWheIQ.jpeg)

Original Image (Image by the Author)

Let's say we want to upsample this image by a factor of 4, getting a `8x8` metric. You have to calculate the intensities of the 4th pixel in the 1st row and the 1st pixel in the 5th row. Let’s see how we can do that.

Assumption: A pixel’s intensity is attributed to its center, hence denoted by the coordinates of the center. This means; in the above `2x2` image, intensity value 10 has the coordinates of (0.5, 0.5), value 20 has (0.5, 1.5), value 30 has (1.5, 0.5), and value 40 has (1.5, 1.5).

Step 1:

Find the coordinates of the required pixels by projecting the `8x8` metric onto the original `2x2` metric.

Step 2:

As the border pixels of the derived `8x8` metric doesn’t have four neighboring pixels; so we should mirror the original image’s borders.

Step 3:

Use the below equation (which we discussed above) to get the final intensity of the unknown pixels.

> Iₜ = (1-a)(1-b)I₁ + (a)(1-b)I₂ + (1-a)(b)I₃ + (a)(b)I₄

![](https://cdn-images-1.medium.com/max/800/1*ipknMsq_mjPrVU3_LBrQYg.jpeg)

Visualization of steps in doing the bilinear interpolation for the above example. (Image by the Author)

### Where was this used in ML?

This is mainly used in the Upsampling layer of Convolutional Neural Networks (CNN). One famous set of models which uses bilinear interpolation is the DeepLab family [1]–[5]. SegNet[5] also extensively talks about using bilinear interpolation in different ways. In the Keras library, you can use the bilinear interpolation based upsampling by setting the Upsampling2D layer’s interpolation method to `bilinear`.

### Related topics

- Nearest neighbor interpolation
- Bicubic interpolation

Hope you learned something today! If anything is unclear, ask in the comments, and I will try to clarify further. Here is a one-sheet recap of today’s article.

![](https://cdn-images-1.medium.com/max/800/1*D5Hh4fnJVp1d42zsXBMB-w.jpeg)

One-sheet recap (Image by the Author)

### References

[1] [L.-C. Chen, G. Papandreou, I. Kokkinos, K. Murphy, and A. L. Yuille, ‘Semantic Image Segmentation with Deep Convolutional Nets and Fully Connected CRFs’, *arXiv [cs.CV]*. 2016. (DeepLabV1)](https://arxiv.org/abs/1412.7062)

[2] [L.-C. Chen, G. Papandreou, I. Kokkinos, K. Murphy, and A. L. Yuille, ‘DeepLab: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs’, CoRR, vol. abs/1606.00915, 2016. (DeepLabV2)](https://arxiv.org/abs/1606.00915)

[3] [L.-C. Chen, G. Papandreou, F. Schroff, and H. Adam, ‘Rethinking Atrous Convolution for Semantic Image Segmentation’, *CoRR*, vol. abs/1706.05587, 2017. (DeepLabV3)](https://arxiv.org/abs/1706.05587)

[4] [L.-C. Chen, Y. Zhu, G. Papandreou, F. Schroff, and H. Adam, ‘Encoder-Decoder with Atrous Separable Convolution for Semantic Image Segmentation’, *CoRR*, vol. abs/1802.02611, 2018. (DeepLabV3+)](https://arxiv.org/abs/1802.02611)

[5] [V. Badrinarayanan, A. Kendall, and R. Cipolla, ‘SegNet: A Deep Convolutional Encoder-Decoder Architecture for Image Segmentation’, CoRR, vol. abs/1511.00561, 2015.](https://arxiv.org/abs/1511.00561)

*More content at* [***PlainEnglish.io***](https://plainenglish.io/)*.*

*Sign up for our* [***free weekly newsletter***](http://newsletter.plainenglish.io/)*. Follow us on* [***Twitter***](https://twitter.com/inPlainEngHQ), [***LinkedIn***](https://www.linkedin.com/company/inplainenglish/)*,* [***YouTube***](https://www.youtube.com/channel/UCtipWUghju290NWcn8jhyAw)*, and* [***Discord***](https://discord.gg/GtDtUAvyhW)***.***
