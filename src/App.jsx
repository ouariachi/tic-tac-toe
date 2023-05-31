import './App.scss'
import { useEffect, useMemo, useState } from 'react';
import Board from './classes/Board';

const TURNS = {
  X: "X",
  O: "O"
}

function App() {
  const [ counter, setCounter ] = useState(0);
  const [ turn, setTurn ] = useState(TURNS.X);
  const [ winner, setWinner ] = useState();
  const [ showModal, setShowModal ] = useState(false);
  const board = useMemo(() => new Board(), []);

  useEffect(() => {
    const grid = document.querySelector("#app > div.grid");
    board.setContent(grid);
    const boardWinner = board.checkWinner();

    if(boardWinner) {
      setWinner(boardWinner);
    } else {
      setWinner(null)
    }
  }, [ turn, board ]);

  useEffect(() => {
    if(!winner && counter < 9) return; 
    setShowModal(true);
  }, [ winner, counter ]);


  const boxClick = (e) => {
    if(winner) return;

    const value = e.target.getAttribute("data-value");
    if(!value) {
      e.target.setAttribute("data-value", turn);
      nextTurn();
    }
  }

  const nextTurn = () => {
    setTurn(() => turn === TURNS.X ? TURNS.O : TURNS.X);
    setCounter(counter + 1);
  }

  const reset = () => {
    setTurn(TURNS.X);
    setCounter(0);
    setWinner(null);
    setShowModal(false);
    board.resetContent();
    
    document.querySelectorAll("#app > .grid > .box").forEach(box => {
      box.removeAttribute("data-value");
    })
  }

  return (
    <main id='app'>
      <h1>Tic Tac Toe</h1>
      
      { counter < 9 && !winner &&
        <h4>Turn of: { turn }</h4>
      }
      
      { winner && <h4>Winner: { winner } 🥳</h4> }
      
      { counter >= 9 && !winner &&
        <h4>Draw! 🎉</h4>
      }
      
      <div className="grid">
        { 
          Array(9).fill(1).map((_, i) => (
            <div className="box" onClick={boxClick} key={i}></div>
          ))
        }
      </div>

      <div className="buttons">
        <button onClick={reset}>Reset</button>
      </div>

      { showModal && 
        
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <h3>Finish</h3>
            
            { !winner && counter >= 9 &&
              <h1>Draw! 🎉</h1>
            }

            { winner && 
              <h1>Winner: {winner}🥳</h1>
            }

            <button onClick={reset}>Play again</button>
          </div>
        </div>
      
      }
    </main>
  )
}

export default App;