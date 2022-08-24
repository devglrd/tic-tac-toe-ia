import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import Cell from "../components/cell";
import axios from 'axios';
import {act, Simulate} from "react-dom/test-utils";
import it from "node:test";

const Home: NextPage = () => {
    const [winner, setWinner] = useState(null as any);
    const [magicBoard] = useState([2, 7, 6, 9, 5, 1, 4, 3, 8]);
    const [isX, setIsX] = useState(true);
    const [cell, setCell] = useState(Array(9).fill(null))
    const [humanScore, setHumanScore] = useState([] as any[]);
    const [iaScore, setIaScore] = useState([] as any[]);
    const [magicHuman, setMagicHuman] = useState([] as any[]);
    const [magicIa, setMagicIa] = useState([] as any[]);


    async function clickOnCell(index: number) {
        if (winner) return;
        if (cell[index]) return;
        cell[index] = isX ? 'X' : '0';
        const humanScoreTemp = [...humanScore, index]
        await setHumanScore(humanScoreTemp);
        const magicHumanScoreTemp = [...magicHuman, magicBoard[index]]
        await setMagicHuman(magicHumanScoreTemp);
        await setCell(cell)
        await setIsX(false)
        if (await isWinning(magicHumanScoreTemp)) {
            setWinner('X');
            return false;
        }
        if (!canPlay()) {
            setWinner('draw');
            return false;
        }
        await playBot(humanScoreTemp)
    }

    async function isWinning(score: number[]) {
        for (let i = 0; i < score.length; i++) {
            for (let j = i + 1; j < score.length; j++) {
                for (let k = j + 1; k < score.length; k++) {
                    if (score[i] + score[j] + score[k] === 15) {
                        return true
                    }
                }
            }
        }
        return false
    }

    async function getWinnerScore() {
        if (await isWinning(magicHuman)) {
            return -1;
        }
        if (await isWinning(magicIa)) {
            return 1;
        }
        if (!canPlay()) {
            return 0;
        }
        return null;


    }

    async function playBot(score: any) {

        // const play = await axios.post('https://tic-tac-toe-ia-api.vercel.app/api/play', {
        //     humanScore: score,
        //     iaScore
        // });
        // const index = play.data;
        const index = await findBestMove();
        const iaScoreTemp = [...iaScore, index]
        cell[index] = '0';
        const magicIaTemp = [...magicIa, magicBoard[index]]
        await setMagicIa(magicIaTemp);
        await setCell(cell)
        await setIaScore(iaScoreTemp);
        await setIsX(true)
        if (await isWinning(magicIaTemp)) {
            setWinner('0');
            return false;
        }

        if (!canPlay()) {
            setWinner('draw');
            return false;
        }
    }

    async function findBestMove() {
        let bestScore = -100;
        let bestMove = 0;
        for (let i = 0; i < 9; i++) {
            if (cell[i] !== null) continue;
            cell[i] = '0';
            const score = await minimax(cell, false);
            cell[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }

        return bestMove;
    }

    async function minimax(copyBoard: any, isMazimizing: boolean) {
        const winner = await getWinnerScore();
        if (winner !== null) {
            return winner
        }
        let bestScore = isMazimizing ? -100 : 100;
        for (let i = 0; i < 9; i++) {
            if (copyBoard[i] === null) {
                copyBoard[i] = isMazimizing ? '0' : 'X';

                if (isMazimizing) {
                    setMagicIa([...magicIa, magicBoard[i]])
                } else {
                    setMagicHuman([...magicHuman, magicBoard[i]])
                }
                const score = await minimax(copyBoard, !isMazimizing);

                copyBoard[i] = null;
                if (isMazimizing) {
                    setMagicIa(magicIa.pop())
                } else {
                    setMagicHuman(magicHuman.pop())
                }
                bestScore = isMazimizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
            }
        }

        return bestScore;
    }

    function canPlay() {
        return cell.filter(cell => cell === null).length > 0;
    }

    async function reset() {
        await setCell(Array(9).fill(null))
        await setIsX(true)
        await setWinner('')
        await setHumanScore([])
        await setIaScore([])
        await setMagicHuman([])
        await setMagicIa([])
    }

    return (
        <main className={"md:container mt-20"}>
            <h1 className="text-5xl text-center">Tic-Tac-Tes</h1>
            <div className="flex justify-center flex-col mt-20">
                {!winner ? <span
                    className={"text-1xl text-center text-center w-full"}>Au tour du joueur {isX ? 'X' : '0'}</span> : ''}
                <div className={`games ${!isX ? 'disabled' : ''}`}>
                    <div className="grid grid-cols-3 grid-rows-3 gap-5">
                        {cell.map((cell, index) => {
                            return <Cell click={() => clickOnCell(index)} key={index} index={cell}/>
                        })}
                    </div>
                </div>
                <div className="actions">
                    {winner ? <div className="mb-10 text-center text-2xl">{winner} a gagné</div> : null}
                    <button className={"bg-amber-100 p-2 rounded"} onClick={() => reset()}>Reset</button>
                </div>
            </div>
        </main>
    )
}

export default Home
