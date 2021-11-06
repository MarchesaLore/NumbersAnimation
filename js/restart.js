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
      obj.classList.add("animate-numbers-completed");
    }
  };
  window.requestAnimationFrame(step);
}


window.addEventListener("scroll", function () {
  executeAnimation();
});

function executeAnimation() {
  var numbers = document.getElementsByClassName("animate-numbers");
  for (var i = 0; i < numbers.length; i++) {
    var elemntspan = numbers.item(i);
    var position = elemntspan.getBoundingClientRect();
    var strhtml = numbers.item(i).innerHTML;

    if (position.top < window.innerHeight && position.bottom >= 0) {
      animateValue(elemntspan, 0, strhtml, 5000);
      elemntspan.classList.remove("animate-numbers");
    }
  }

  var numbersout = document.getElementsByClassName("animate-numbers-completed");
  for (var i = 0; i < numbersout.length; i++) {
    var elemntspan = numbersout.item(i);
    var position = elemntspan.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom >= 0) {
      elemntspan.classList.remove("animate-numbers-completed");
      elemntspan.classList.add("animate-numbers");
    }
  }
}
