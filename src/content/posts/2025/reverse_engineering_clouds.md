---
author: whiskas101
pubDatetime: 2025-09-20T17:30:00Z
modDatetime:
title: "Reverse Engineering: Clouds (yes, clouds.)"
featured: true
draft: false
tags:
    - graphics
    - rendering
    - clouds
    - sky
    - "sky: children of the light"
description: "I tried recreating stylized clouds they way thatgamecompany did for their mobile game, Sky: Children of the Light. I got close. (ish)"
canonicalURL: ""
---

# Clouds

![Sky: Children of the Light (Playstation)](https://media.whiskas101.dev/2025/reverse_engineering_clouds/sky-children-of-the-light-background.jpg)
<center>
    <small>the first chapter, where you get your <b>wings</b></small>
</center>

> Undoubtedly *the* most majestic form of *H<sub>2</sub>O*. 
> - <cite>whiskas101<cite>

Clouds are hard to render. __Convincing__ clouds, that is. If you've ever tried your hand at drawing, you would know that the difficulty of drawing something is inherently tied to how it reflects light, how it absorbs light. Clouds? Well, they also absorb and scatter. It's particularly annoying because for most materials we can just get away with modelling how it reflects.

<!--Needs more build up here-->

Now imagine you're a game dev, in 2012, and you need to render these on a mobile phone. Also, make it interactive. Also, it has to run smooth, on an iPhone 6. Good luck.


### Table of contents


## What makes it so hard? 

I will point the question back to you, what *wouldn't* make it hard? Everything about it is a headache. Interaction, lighting, self-shadowing, and *animation*. Yeah, those clouds are animated (in a way). 
 - They are not solid objects, they're volumes
 - They don't block light, they scatter it. <small>(more on this later)</small>

 There's actually more, but in the context of *stylized* clouds, the ones that we see in this game, we don't actually encounter those issues, so I will omit them.


## The Journey

I started out ***extremely*** confident. Afterall, the game runs on a phone that's like ~8 years old, how hard could it be to run something like this on a _modern_ GPU? 
> [!WARNING]
> This is going to read like a story, a recollection of events as they happened. If you're strictly interested in the math, code and rendering techniques, you should use the table of contents to skip to the end.

Some things stood out in the way **thatgamecompany** stylized their clouds. They are opaque. They don't have those wispy edges, not at a distance anyway. They look cartoonishly dense. If you pay close attention, you can't actually see any meaningful transparency to them. They might as well be white foamy water.

The very first technique I tried was, based on a [reddit post](https://www.reddit.com/r/Unity3D/comments/1qg1ndn/cloud_shader_inspired_by_sky_children_of_light/)
and also [this one](https://www.reddit.com/r/Unity3D/comments/iuy44e/skychildren_of_light_inspired_cloud_shader_in_urp/) discussing the very same clouds.^

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="546">
<a href="https://www.reddit.com/r/Unity3D/comments/1qg1ndn/cloud_shader_inspired_by_sky_children_of_light/">Cloud shader inspired by Sky: Children of Light</a><br> by
<a href="https://www.reddit.com/user/Then-Drive2284/">u/Then-Drive2284</a> in
<a href="https://www.reddit.com/r/Unity3D/">Unity3D</a>
</blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>
<br>

My approach assumed those clouds to be a mesh, just like these reddit users. To quote the author of this one:

<br>
<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="566">
<a href="https://www.reddit.com/r/Unity3D/comments/iuy44e/skychildren_of_light_inspired_cloud_shader_in_urp/">Sky:Children of Light inspired cloud shader in URP. Opaque + depth fade + tessellation + basic interaction</a><br> by
<a href="https://www.reddit.com/user/907games/">u/907games</a> in
<a href="https://www.reddit.com/r/Unity3D/">Unity3D</a>
</blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

>The clouds are mesh objects, the circular cloud is the standard sphere. The clouds in Sky:Children of Light were also mesh objects, but they used a "blob" technique to model them. I used clayxels to make the cloud "blob" and baked it into a mesh. Made in amplify shader editor, marked as opaque in the rendertype and transparent in queue. Depth fade gives a transparent illusion. Tessellation gives the cloud more detail. The only thing I cant figure out is how Sky was able to make the edges of the clouds have small particle like effects. Fresnel alpha doesnt work too well the way I tried, but maybe I just did it wrong and theres another way. 
> - [u/907games](https://www.reddit.com/user/907games/)







