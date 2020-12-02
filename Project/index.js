window.addEventListener("load", () => {
  const buttonAdd = document.querySelector('.buttonAdd');
  const divBlock = document.querySelector('.inp');
  const fourDots = document.querySelector('.fourDots');
  const sortBtn = document.querySelector('.silverArrow');

  function addtask() {
    let newDiv = document.createElement('ul');
    newDiv.classList.add('draggable');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = '<img src="images/fourDots.svg" class="fourDots"><input type="text" class="input"></input><img src="images/crossWhite.svg" class="cross">';
    divBlock.appendChild(newDiv);
    
    const knopka = newDiv.querySelector('.cross');
    knopka.addEventListener ('click', function() {
      this.parentElement.remove();
    })

        /*  Dragg&Drop */
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.inp');

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })
    })
    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    })
    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

      draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return {offset: offset, element: child}
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element
    }   /* Dragg & Dropp finish*/
  }
// next step is sort. Lets doing it!!!
  sortBtn.addEventListener('click', function (event) {
  let liItems = document.querySelectorAll('ul');
  // console.log(this, liItems, event.target);
  event.target.classList.toggle('sort-bottom');
  let sortLiItems;
  if (event.target.classList.contains('sort-bottom')) {
    sortLiItems = [...liItems].sort(function (a, b) {
      // console.log(a.childNodes[1].value, b.lastElementChild.value)
      if (a.childNodes[1].value >= b.childNodes[1].value) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    sortLiItems = [...liItems].sort(function (a, b) {
      if (a.childNodes[1].value <= b.childNodes[1].value) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  divBlock.innerHTML = '';
  for (let ul of sortLiItems) {
    divBlock.appendChild(ul);
  }
});

  buttonAdd.addEventListener('click', () => {
  addtask();
  });
  addtask();
});