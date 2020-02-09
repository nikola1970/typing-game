import React from 'react';

// hooks
import useTyping from '../hooks/useTyping';

type Props = {
    words: string[];
};

const Game: React.FC<Props> = ({ words }) => {
    const {
        isPlaying,
        score,
        time,
        word,
        correctLetterIndex,
        handleStart,
        handleReset,
    } = useTyping(words);

    return (
        <div className="wrapper">
            <h1>Typing game</h1>
            <p>Type as many words as you can until time runs out!</p>
            <div className="outerWrap">
                <div className="scoreWrap">
                    <p>Score</p>
                    <span className="score">{score}</span>
                </div>
                <div className="timeWrap">
                    <p>Time left</p>
                    <span className="time">{time}</span>
                </div>
            </div>
            <div className="wordsWrap">
                <p className={correctLetterIndex === word.length ? 'words animate' : 'words'}>
                    {word.map((char: string, index: number) => {
                        return index < correctLetterIndex ? (
                            <span
                                key={`${char}-${index}`}
                                className={index === correctLetterIndex - 1 ? 'active' : ''}
                            >
                                {char}
                            </span>
                        ) : (
                            char
                        );
                    })}
                </p>
            </div>
            {!isPlaying && (
                <button onClick={handleStart} type="button">
                    Start
                </button>
            )}
            {time === 0 && (
                <button onClick={handleReset} type="button">
                    Reset
                </button>
            )}
        </div>
    );
};

export default Game;
