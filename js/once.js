/**type one */
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

  executeAnimation();

  window.addEventListener('scroll', function() {
    executeAnimation();
  });

  function executeAnimation(){    
    var numbers = document.getElementsByClassName("animate-numbers");
    for (var i = 0; i < numbers.length; i++) {
      var elemntspan = numbers.item(i);
      var position = elemntspan.getBoundingClientRect();
      var strhtml = numbers.item(i).innerHTML;     
  
      // checking whether fully visible
      //if(position.top >= 0 && position.bottom <= window.innerHeight) {
       // animateValue(elemntspan, 0,strhtml, 5000);
       // elemntspan.classList.remove("animate-numbers");
      //}    

      // checking for partial visibility
      if(position.top < window.innerHeight && position.bottom >= 0) {
        //if visible then start animation
        animateValue(elemntspan, 0,strhtml, 5000);
        //remove class = guarantee it gets played only once
        elemntspan.classList.remove("animate-numbers");
      }
    }
  }