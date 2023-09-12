import React, { useState } from 'react'
import './App.css'

interface Synonym {
  word: string;
}

function App() {
  
  let [word, setWord] = useState<string>("")
  let [synonyms, setSynonyms] = useState<Synonym[]>([])

  const handleFormSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    fetchSynonyms()
  }

  const fetchSynonyms = () => {
    const URL = `https://api.datamuse.com/words?rel_rhy=${word}`

    fetch(URL)
    .then(response => response.json())
    .then(data => setSynonyms(data))
  }

  return (
    <div className="app">
        <form className="form" onSubmit={handleFormSubmit}>
          <fieldset >
            <legend>Words that rhyme with: <i>{word}</i></legend>
            <div className="field-format">
              <label htmlFor="word-input">Input word:</label>
              <input 
                name="word-input"
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)} />
              <button type="submit">Submit</button>
            </div>
          </fieldset>
        </form>

        <div className='rhyme-word-list'>
          {
            synonyms.map((s) => {
            return <div
                    className='word'
                    key={s.word}>{s.word}
                  </div>}
            )
          }
        </div>
    </div>
  )
}

export default App
