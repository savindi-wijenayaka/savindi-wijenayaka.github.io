---
title: "Getting started with Unity3D"
slug: "getting-started-with-unity3d"
date: "2018-06-11"
excerpt: "Hi guys. I have been meddling around with unity for past few months and thought of writing a beginner guide (This is my first article of…"
tags: []
source: "medium"
mediumUrl: "https://medium.com/@savindi-wijenayaka/first-step-to-unity3d-eddd28012efd"
featured: false
readingTime: 4
convertedAt: "2026-04-27T02:49:59Z"
coverImage: "/assets/blog/getting-started-with-unity3d.jpeg"
---

Hi guys. I have been meddling around with unity for past few months and thought of writing a beginner guide (This is my first article of series of articles in unity)🤗 So lets jump into it!

First thing you have to do is to download Unity3D from the Unity official website <https://unity3d.com/get-unity/download> (I won’t go in detail with the downloading process since it is user friendly and easy to understand)

Now lets open Unity and create a new project. Click on “new” in the top right corner. It will open up a new panel to create a new project. You can set your project name and path to save from there. Also don’t forget to select 3D. If you have asset packages that needed to be added, click on “add asset package” and select from the list given. However, as a start we don’t need to consider this now.

![](https://cdn-images-1.medium.com/max/800/1*O3NvTXsKKwa6dpt15RSVyw.png)

“Create new project” window

After successful creation of a new project, you will be presented with the Unity3D Editor. (Don’t be afraid to play-around with the layout of the editor because you can always reset it to default by using layout drop down in the top right corner, marked with red circle in bellow image)

I’ll introduce you to some basic things about the unity editor. These are the essential elements.

![](https://cdn-images-1.medium.com/max/1200/1*OFsYmGNOw0gtFTNQRb1CMA.png)

Unity3D Engine

### **Main Elements of Unity Editor**

The button set in the top left corner can be used to manipulate the game objects we make. Hand tool, the first of the set, can be used to move around in the scene. You can scale, rotate, move game objects with the following 5 keys (game objects and scene will be describe at the latter part of the article).

With the x,y,z handles marked with a red round can be used to have different view points at the scene. For example, if you want to look at the scene from above press the green color y handle which is at the top.

Next there are few main panes that any Unity developer should know well. Those are,

1. ***Hierarchy Pane***: Game Objects are arranged here in a hierarchical manner. In default layout, it is in the left side.
2. ***Project pane*** : Project folder is opened in here. All the assets, scenes, scripts etc. can be found here. In default layout, it is at the bottom.
3. ***Inspector Pane***: when you select an object, its’ details are displayed in Inspector pane. In default layout, it is in the left side.
4. ***Console***

### **Game Object, Component and Scene**

You might have seen stage drama. There you have an actor who acts according to a script provided by a director. In game engines, those actors become the characters or the objects we see in the game. Those characters/objects are known as ***Game Objects (GO)*** in the Game developer jargon. Similarly, the script become the ***Component*** of a GO, that govern its’ behavior.

![](https://cdn-images-1.medium.com/max/800/1*6YFi1B56tJfDFdKs7lzFNw.png)

Concept of Game Object and Components

Scene is a collection of hierarchical game objects. A default scene will only have only main camera and directional light.

To create a scene, right click on ***project pane -> create -> Scene***

To create a script, right click on ***project pane -> create -> C# Script.*** Double click on the script to open it in an IDE like visual studio or monodevelop.

To create a game object (Ex: Sphere), right click on ***hierarchy pane -> 3D object-> Sphere***

To add a components, to a GO,

1. Drag and Drop the component on to the GO in the hierarchy pane.
2. Select the GO from hierarchy pane and drag and drop the component to the inspector pane of selected GO.

Same script can be added to many actors. It mean same behavior can be added to many game objects.

Similarly, one game object can have many components, which mean, one game object can have many behaviors.

Default script,

![](https://cdn-images-1.medium.com/max/800/1*A7CWzZClLxxCRaQRWOOVeg.png)

Another important thing is that if you make a global variable “public” in the script, it will be shown in the inspector. Therefore, it can be adjusted or initialized in the inspector.

This is the fundamentals of Unity3D that any starter should know. Hope it will be important to you. In the next article, I’ll tell you about how to make your first 3D game 🤩
