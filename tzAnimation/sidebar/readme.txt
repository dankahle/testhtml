

dk-sidebar

4 different ways here:
trans, keyframe, js, jquery

By far the most compact is jquery, albeit is does require jquery. You could configure it with attributes, but by far the easiest way to manipulate it is with css, less in the real world. I.e. with less you could use boot variables for colors and such. The leftOut val would be a variable and not duplicated in the code then. 

Ok, so easy css manipulation, you get the sidebar you want, You want an outline on it, fine, just add it. I guess you could do the same in css, but best just to have the css right in front of you instead of hidden in the directive, or even on the directive template. Give them the template as well, then they can change anything. 

The js version makes absolutely no sense as you do all the same js work, only to handle it just the same way as jquery. Why not just do jquery right off the bat.

So... if angular only, only have 2 choices, right? trans or keyframes. There is no angular animation per se, there's only jq animation and if you don't have that, then trans or keyframes, fired by $animate.enter/leave/move/addClass/removeClass.

transitions vs keyframes. Transitions is for moving from one state to the next. keyframes can have multiple states. If all you need is the former, then use that I'm thinking. If you want to brute force it though, then can just use keyframes. Let's say you wanted to move the sidebar in, then move the button out on its own. How to do it? Keyframes my man. 75% for the slide, 25% for the button pop. Let's try that...
