/**type one */
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      //when animation is completed I add this class
      obj.classList.add("animate-numbers-completed");
    }
  };
  window.requestAnimationFrame(step);
}


window.addEventListener("scroll", function () {
  executeAnimation();
});


function executeAnimation() {
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

  var numbers = document.getElementsByClassName("animate-numbers");
  for (var i = 0; i < numbers.length; i++) {
    var elemntspan = numbers.item(i);
    var position = elemntspan.getBoundingClientRect();
    var strhtml = numbers.item(i).innerHTML;
    //check if numbers with this class are visible
    if (position.top < window.innerHeight && position.bottom >= 0) {
      //if they are animate
      animateValue(elemntspan, 0, strhtml, 5000);
      //and remove the class so that they don't restart to each scroll
      elemntspan.classList.remove("animate-numbers");
    }
  }

}
