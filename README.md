# Numbers Animation

My goal was to get an animation of a number going from 0 to x

I first tried a few different animations 1 with js and 2 with css
in index.html

then I picked the js one and made 2 examples

![image](https://user-images.githubusercontent.com/22336407/140591274-79464031-f697-4dcf-a5aa-8527bc6fc68c.png)

the animation js is this animateValue, you can pass an object, start value, end value and duration
```rd
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  ````
  
  
<h1>Animation Once</h1>
this has 2 blocks of numbers increasing, the first is visible right on the opening of the page and goes right away, the second is activated when you scroll down. The animation is played only once
https://codepen.io/marchesinlorena/pen/gOxePwK


 I first made it go through all my numbers they are all in span with class 'animate-numbers'
 from the span I got the obj span
 and the value in it (innerHTML) so that I have my end number, start will be 0 in this case and duration is the same for all of them
 
 
 ```rd
  var numbers = document.getElementsByClassName("animate-numbers");  
  for (var i = 0; i < numbers.length; i++) {
      var elemntspan = numbers.item(i);
      var position = elemntspan.getBoundingClientRect();
      var strhtml = numbers.item(i).innerHTML;     
      animateValue(elemntspan, 0,strhtml, 5000);
  }
````

for animate once I had 2 goals:
1) animate the object when visible. To do that I made the funcion execute animation go on the event listener for the scrolling

```rd
  window.addEventListener('scroll', function() {
    executeAnimation();
  });
```
  
2) having it animate only once. To do that I removed the class animate-numbers after it got activated

```rd
      if(position.top < window.innerHeight && position.bottom >= 0) {
        //if visible then start animation
        animateValue(elemntspan, 0,strhtml, 5000);
        //remove class = guarantee it gets played only once
        elemntspan.classList.remove("animate-numbers");
      }
````



<h1>Animation Restart</h1>
the animation will go from beginning to end but when the numbers are not anymore visible on the screen and then visible again they will get started again, so just go to the page and scroll up and dow and you'll see the animation going again.
https://codepen.io/marchesinlorena/pen/XWaEXNX


1) Animate the object when visible like the previous example
2) When animation is completed I add a class 'animate-numbers-completed' to the object
```rd
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      //when animation is completed I add this class
      obj.classList.add("animate-numbers-completed");
    }
````
3) I check for all the objects with class 'animate-numbers-completed', if they are ouf of frame I remove the class completed and add the original class 'animate-numbers' I sort of prepare them for the next round, so that they can go back to step 1)

```rd
function restoredCompletedAnimations() {
  //check all completed animations if they go out of frame
  var numbersout = document.getElementsByClassName("animate-numbers-completed");
  for (var i = 0; i < numbersout.length; i++) {
    var elemntspan = numbersout.item(i);
    var position = elemntspan.getBoundingClientRect();  
    //if they are ouf of frame then remove the class completed and make them ready to go again     
    if (position.top < window.innerHeight && position.bottom < 0) {
      elemntspan.classList.remove("animate-numbers-completed");
      elemntspan.classList.add("animate-numbers");
    }
  }
}

````
