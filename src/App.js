import './index.css';
import React, { useState, useEffect } from 'react';


  


function App() {

  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [clearAll, setClearAll] = useState('');
  const [checked, setChecked] = useState([]);
  const [theme, setTheme] = useState('dark');

  const handleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  const handleAddNote = () => {
    if (inputValue.trim() !== '') {
    setNotes([...notes, inputValue]);
    setInputValue('');
    }
  }

  const handleInputChange = event => {
    setInputValue(event.target.value);
  }

  const handleClearAll = () => {
    setNotes([]);
    setChecked([]);
  }

  const handleCheckItem = (event) => {
    const index = parseInt(event.target.value);
    const isChecked = event.target.checked;
    setChecked((currentChecked) =>
      isChecked ? [...currentChecked, index] : currentChecked.filter((currentIndex) => currentIndex !== index)
    );
    if (isChecked) {
      setNotes((currentNotes) => currentNotes.filter((_, noteIndex) => noteIndex !== index));
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.className = theme;
  }, [theme]);

  return (
    <section className={`background ${theme}`}>
      <div className="App">
        <div className="checkList">
          <button
            className={`button-switch ${theme}`}
            onClick={handleTheme}
            checked={theme === 'light'}
          >
            {theme === 'light' ? 'Light mode' : 'Dark mode'}
          </button>
          <section className='container'>
            <input
              className="search-bar"
              type='text'
              placeholder='New Item'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="add-button" onClick={handleAddNote}>Add</button>
            <ul>
              {notes.map((note, index) => (
                <li key={note}>
                  <input
                    className='checked-item'
                    value={index}
                    type="checkbox"
                    checked={checked[index] || false}
                    onChange={handleCheckItem}
                  />
                  {note}
                </li>
              ))}
            </ul>
            <button className="clear-button" onClick={handleClearAll}>Clear All</button>
          </section>
        </div>
      </div>
    </section>
  );
}

export default App;
