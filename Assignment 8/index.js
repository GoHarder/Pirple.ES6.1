// Container for frontend application
var app = {};

// Variables
app.cells = [];
app.token = 'X';
app.board = {};
app.wins = [];
app.message = '';
app.turn = 0;
app.modal = undefined;
app.modalText = undefined;

// Bind all the cells on the board
app.bindCells = () => {
   for (let i = 0; i < app.cells.length; i++) {
      const cell = app.cells[i];

      cell.addEventListener('click', event => {
         let cellCont = event.target.children[0];

         if (!cellCont.innerHTML) {
            cellCont.innerHTML = app.token;
            cellCont.style.color = app.token === 'X' ? 'red' : 'black';
            app.switchToken(app.token);
            app.readBoard();
            app.turn++;
            app.checkWins();
         }
      });
   }
};

// Bind the close button
app.bindClose = () => {
   close = document.getElementById('close');

   close.addEventListener('click', () => {
      app.modal.style.display = 'none';
      app.message = '';
      app.token = 'X';
      app.turn = 0;
      app.cells.forEach(cell => {
         cell.children[0].innerHTML = '';
      });
      app.readBoard();
      app.checkWins();
   });
};

// Switch the turn
app.switchToken = token => {
   app.token = token === 'X' ? 'O' : 'X';
};

// Read the board
app.readBoard = () => {
   app.cells.forEach(cell => {
      app.board[cell.id] = cell.children[0].innerHTML;
   });
};

// Check for wins
app.checkWins = () => {
   app.wins = [];
   app.wins[0] = [app.board.A1, app.board.A2, app.board.A3];
   app.wins[1] = [app.board.B1, app.board.B2, app.board.B3];
   app.wins[2] = [app.board.C1, app.board.C2, app.board.C3];
   app.wins[3] = [app.board.A1, app.board.B1, app.board.C1];
   app.wins[4] = [app.board.A2, app.board.B2, app.board.C2];
   app.wins[5] = [app.board.A3, app.board.B3, app.board.C3];
   app.wins[6] = [app.board.A1, app.board.B2, app.board.C3];
   app.wins[7] = [app.board.A3, app.board.B2, app.board.C1];

   app.wins.forEach(win => {
      if (!app.message) {
         if (app.equalArray(win, ['X', 'X', 'X'])) {
            app.message = 'X has won!';
         } else if (app.equalArray(win, ['O', 'O', 'O'])) {
            app.message = 'O has won!';
         } else if (app.turn === 9) {
            app.message = 'Cats game!';
         }
      }
   });

   app.modalText.innerHTML = app.message;

   if (app.message) {
      app.modal.style.display = 'block';
   }
};

app.equalArray = (array1, array2) => {
   output = false;

   if (array1.length === array2.length) {
      tests = [];

      for (let i = 0; i < array1.length; i++) {
         tests.push(array1[i] === array2[i]);
      }

      output = tests.indexOf(false) === -1;
   }

   return output;
};

// Init
app.init = function() {
   app.cells = document.querySelectorAll('.cell');
   app.modal = document.getElementById('modal');
   app.modalText = document.getElementById('message');
   app.readBoard();
   app.checkWins();
   app.bindCells();
   app.bindClose();
};

// Call the init processes after the window loads
window.onload = () => {
   app.init();
};
