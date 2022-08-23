import type {NextPage} from 'next'
import {useEffect, useState} from "react";
import Cell from "../components/cell";
import axios from 'axios';
import {act} from "react-dom/test-utils";
import it from "node:test";

const Home: NextPage = () => {
    const [isX, setIsX] = useState(true);
    const [cell, setCell] = useState(Array(9).fill(null))
    const [humanScore, setHumanScore] = useState([] as any[]);
    const [iaScore, setIaScore] = useState([] as any[]);

    async function clickOnCell(index: number) {
        cell[index] = isX ? 'X' : '0';
        const humanScoreTemp = [...humanScore, index]
        setHumanScore(humanScoreTemp);
        await setCell(cell)
        await setIsX(false)

        // setTimeout(async () => {
        await playBot(humanScoreTemp)
        // }, 1000)
    }

    async function playBot(score: any) {

        const play = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/play', {
            humanScore: score,
            iaScore
        });
        const index = play.data;
        const iaScoreTemp = [...iaScore, index]
        setIaScore(iaScoreTemp);
        cell[index] = '0';
        await setCell(cell)
        await setIsX(true)
    }

    function reset() {
        setCell(Array(9).fill(null))
        setIsX(true)
    }

    return (
        <main className={"md:container mt-20"}>
            <h1 className="text-5xl text-center">Tic-Tac-Tes</h1>
            <div className="flex justify-center flex-col mt-20">
                <span className={"text-1xl text-center text-center w-full"}>Au tour du joueur {isX ? 'X' : '0'}</span>
                <div className={`games ${!isX ? 'disabled' : ''}`}>
                    <div className="grid grid-cols-3 grid-rows-3 gap-5">
                        {cell.map((cell, index) => {
                            return <Cell click={() => clickOnCell(index)} key={index} index={cell}/>
                        })}
                    </div>
                </div>
                <div className="actions">
                    <button className={"bg-amber-100 p-2 rounded"} onClick={() => reset()}>Reset</button>
                </div>
            </div>
        </main>
    )
}

export default Home
