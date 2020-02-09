import React from 'react';

import './styles.css';

// word list
import { wordList } from './words';

// components
import Game from './components/Game';

const App: React.FC = () => {
    return (
        <div className="App">
            <Game words={wordList} />
        </div>
    );
};

export default App;
