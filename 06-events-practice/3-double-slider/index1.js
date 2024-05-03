export default class DoubleSlider {
forLeft 
forRight 
progressLeft = document.body.getBoundingClientRect().left
progressRight = document.body.getBoundingClientRect().right
proba
constructor() {
    
  this.element = this.createElement(); 
    
  this.thumbLeft();
  this.thumbRight();
   
}


createElement() {
    
  console.log(this.progressLeft,this.progressRight);
  const element = document.createElement('div');
  element.innerHTML = `
    <div class="range-slider">
    <span>$10</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress" style="left: 300 px; right: 0"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span>$100</span>
  </div>
    
    `;
  document.body.append(element);

  return element;
}

 

thumbLeft() {
  let props;
  let progress = function(proba) {
    let progress = document.querySelector('.range-slider__progress');
    //progress.classList = 'progress';
    
    progress.style.left = proba + "px";
    console.log('+++', proba);
  };

  let thumb = document.querySelector('.range-slider__thumb-left');

  thumb.onmousedown = function(event) {
    event.preventDefault(); 

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - document.body.getBoundingClientRect().left;
      props = event.clientX;
        
      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = document.body.offsetWidth - thumb.offsetWidth;
      if (newLeft > this.forLeft) {
        newLeft = this.forLeft;
      }

      thumb.style.left = newLeft + 'px';

       

      this.forRight = newLeft;
      progress(props);
       
    }
     

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
        
    }

  };

  thumb.ondragstart = function() {
    return false;
  };

   
}


thumbRight() {
  let props;
  let thumb = document.querySelector('.range-slider__thumb-right');

  let progress = function(proba) {
    let progress = document.querySelector('.range-slider__progress');
    //progress.classList = 'progress';
    
    progress.style.right = proba + "px";
    console.log('+++', proba);
  };

  thumb.onmousedown = function(event) {
    event.preventDefault(); 

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    
      
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - document.body.getBoundingClientRect().left;
      props = document.body.getBoundingClientRect().right - event.clientX ;
       
      if (newLeft > thumb.getBoundingClientRect().right) {
        newLeft = document.body.getBoundingClientRect().left - thumb.getBoundingClientRect().right;
      }
      let rightEdge = document.body.offsetWidth - thumb.offsetWidth;
      if (newLeft < this.forRight) {
        newLeft = this.forRight;
      }
       

      thumb.style.left = newLeft + 'px';

      this.forLeft = newLeft;
      progress(props);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

  };

  thumb.ondragstart = function() {
    return false;
  };
}


 

destroy() {
    
  this.element.remove();
}

}
