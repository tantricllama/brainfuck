"use strict";

var tr = document.querySelector('table#cells tr'),
  output = document.getElementById('output'),
  input = document.getElementById('input'),
  program = document.getElementById('program'),
  play = document.getElementById('play'),
  examples = document.getElementById('examples'),
  i, td, cells, inputValue, programValue, result,
  pointer, cursor, loops, loopCount, timer;

function playHandler() {
  var i;

  if (play.className === 'btn btn-success') {
    // Reset the cells.
    for (i = 0; i < cells.length; i++) {
      cells[i].className = '';
      cells[i].innerHTML = 0;
    }

    inputValue = input.value.split('');
    programValue = program.value;
    result = '';
    pointer = 0;
    cursor = 0;
    loops = [];
    loopCount = 0;

    // Run the program with the specified delay.
    timer = setInterval(runHandler, document.getElementById('delay').value);

    // Disable the textarea so we can't change the program while its running.
    program.disabled = true;

    // Change the button to a red stop button.
    play.className = 'btn btn-danger'; 
    play.innerHTML = 'Stop';

    // Reset the output field
    output.value = '';
  } else {
    // Stop the timer.
    clearInterval(timer);

    // Enable the textarea.
    program.disabled = false;

    // Change the button to a green play button.
    play.className = 'btn btn-success';
    play.innerHTML = 'Play';

    // Show the result, if there is one.
    output.value = result;
  }
}

function runHandler() {
  var cell = parseInt(cells[pointer].innerHTML), i;

  if (cursor >= programValue.length) {
    playHandler();
  }

  // Remove the pointer class as we might be moving it.
  cells[pointer].className = '';

  switch (programValue.charAt(cursor)) {
    case '>':
      pointer++;
      break;

    case '<':
      pointer--;
      break;

    case '+':
      cells[pointer].innerHTML = cell + 1;
      break;

    case '-':
      cells[pointer].innerHTML = cell - 1;
      break;

    case '.':
      result += String.fromCharCode(cell);
      break;

    case ',':
      cells[pointer].innerHTML = inputValue.length ? inputValue.shift().charCodeAt(0) : 0;
      break;

    case '[':
      if (cell === 0) {
        // Find the end of the loop.
        for (i = cursor; i < programValue.length; i++) {
          switch (programValue[i]) {
            case '[':
              loopCount++;
              break;

            case ']':
              loopCount--;

              if (!loopCount) {
                cursor = i;
                i = programValue.length;
              }

              break;
          }
        }
      } else {
        loops.push(cursor); // position of '[' command
      }

      break;

    case ']':
      cursor = loops.pop() - 1; // position of command before '[' because cursor will be incremented
      break;
  }

  // Mark the current cell.
  cells[pointer].className = 'text-primary';

  cursor++;
}

// Build the cell list, 39 table cells with 0 in them.
for (i = 0; i < 30; i++) {
  td = document.createElement('td');
  td.innerHTML = 0;
  tr.appendChild(td);
}

// The cell list.
cells = tr.querySelectorAll('td');

// Play button handler.
play.addEventListener('click', playHandler);

// querySelectorAll "array-like" object but forEach wont work, so we need to convert it.
[].forEach.call(examples.querySelectorAll('li a'), function(example) {
  // Setup the click event for the example.
  example.addEventListener('click', function(event) {
    program.value = this.dataset.program;
    input.value = this.dataset.input;
    output.value = '';
  });
});

// Set focus on the textarea.
program.focus();