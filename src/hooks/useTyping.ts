import { useReducer, useEffect } from 'react';

enum GAME {
    START_GAME = 'START_GAME',
    RESET_GAME = 'RESET_GAME',
    NEXT_WORD = 'NEXT_WORD',
    DECREMENT_TIME = 'DECREMENT_TIME',
    SET_LETTER_INDEX = 'SET_LETTER_INDEX',
}

type State = {
    isPlaying: boolean;
    score: number;
    time: number;
    word: string[];
    correctLetterIndex: number;
};

type Action =
    | { type: GAME.START_GAME; payload: string[] }
    | { type: GAME.RESET_GAME }
    | { type: GAME.NEXT_WORD; payload: string[] }
    | { type: GAME.DECREMENT_TIME }
    | { type: GAME.SET_LETTER_INDEX };

const initialState: State = {
    isPlaying: false,
    score: 0,
    time: 60,
    word: [],
    correctLetterIndex: 0,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case GAME.START_GAME:
            return {
                ...state,
                isPlaying: true,
                word: action.payload,
            };
        case GAME.RESET_GAME:
            return {
                ...state,
                isPlaying: true,
                score: 0,
                time: 60,
            };
        case GAME.NEXT_WORD:
            return {
                ...state,
                correctLetterIndex: 0,
                word: action.payload,
                score: state.score + 1,
            };
        case GAME.DECREMENT_TIME:
            return {
                ...state,
                time: state.time - 1,
            };
        case GAME.SET_LETTER_INDEX:
            return {
                ...state,
                correctLetterIndex: state.correctLetterIndex + 1,
            };
        default:
            return state;
    }
}

function getNextWord(wordList: string[]) {
    return wordList[Math.floor(Math.random() * (wordList.length - 1 - 0 + 1)) + 0].split('');
}

export default function useTyping(words: string[]) {
    const [{ isPlaying, score, time, word, correctLetterIndex }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    const handleStart = () => {
        dispatch({ type: GAME.START_GAME, payload: getNextWord(words) });
    };
    const handleReset = () => {
        dispatch({ type: GAME.RESET_GAME });
    };

    useEffect(() => {
        let id: number;
        if (isPlaying && time > 0) {
            id = window.setInterval(() => {
                dispatch({ type: GAME.DECREMENT_TIME });
            }, 1000);
        }
        return () => clearInterval(id);
    }, [isPlaying, time]);

    useEffect(() => {
        function handleKeyPress({ key }: KeyboardEvent) {
            if (
                word[correctLetterIndex] &&
                key.toUpperCase() === word[correctLetterIndex].toUpperCase()
            ) {
                dispatch({ type: GAME.SET_LETTER_INDEX });
            }
        }

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [correctLetterIndex, word]);

    useEffect(() => {
        if (correctLetterIndex === word.length && word.length > 0) {
            setTimeout(() => {
                dispatch({ type: GAME.NEXT_WORD, payload: getNextWord(words) });
            }, 400);
        }
    }, [correctLetterIndex, word, words]);

    return {
        isPlaying,
        score,
        time,
        word,
        correctLetterIndex,
        handleStart,
        handleReset,
    };
}
