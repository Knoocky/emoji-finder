import React, {useState} from 'react';
import { get, getAsync } from './api';
import './App.css';

const Card = (props) => {
  return (
    <div className='card'>
        <p className='emoji'>{props.symbol}</p>
        <p className='emoji-name'>{props.title}</p>
        <p className='emoji-tags'>{props.keywords}</p>
    </div>
  );
}

const emojies = get('https://emoji.ymatuhin.workers.dev/');

function App() {
  const [searchValue, setSearchValue] = useState("");

  let emojiesArray = [];
  if (emojies) {
    emojiesArray = emojies.map(item => {
      const keywords = new Set(item.keywords.split(" "));
  
      let keywordsString = "";
      keywords.forEach(item => keywordsString = `${keywordsString}${item} `);
  
      return {
        "title": item.title,
        "symbol": item.symbol,
        "keywords": keywordsString,
      }
    }).filter(item => item.keywords.includes(searchValue) || item.title.includes(searchValue))
  }

  const emptyElementsCount = 3 - emojiesArray.length % 3;

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
      </header>
      <main className='App-main'>
        <input type='text' placeholder='Placeholder' className='search' value={searchValue} onChange={value => setSearchValue(value.target.value)}/>
        <div className='cards'>
          <>
            {emojiesArray.map(item => 
              <Card key={item.title} symbol={item.symbol} title={item.title} keywords={item.keywords} />
            )}
            {emptyElementsCount !== 3 && new Array(emptyElementsCount).fill(0).map((i, index) => <div key={index} className='filling-empty-space-childs'></div>)}
          </>
        </div>
      </main>
    </div>
  );
}

export default App;
