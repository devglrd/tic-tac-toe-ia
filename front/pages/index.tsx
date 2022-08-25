import type {NextPage} from 'next'
import {useState} from "react";
import Cell from "../components/cell";
import axios from 'axios';

const Home: NextPage = () => {
    const [winner, setWinner] = useState(null as any);
    const [magicBoard] = useState([2, 7, 6, 9, 5, 1, 4, 3, 8]);
    const [isX, setIsX] = useState(true);
    const [cell, setCell] = useState(Array(9).fill(null))
    const [magicHuman, setMagicHuman] = useState([] as any[]);
    const [magicIa, setMagicIa] = useState([] as any[]);


    async function isWinning(score: any[]) {
        for (let i = 0; i < 9; i++) {
            for (let j = i + 1; j < 9; j++) {
                for (let k = j + 1; k < 9; k++) {
                    if (score[i] + score[j] + score[k] === 15) {
                        return true;
                    }
                }
            }
        }
    }

    async function clickOnCell(index: number) {
        if (cell[index]) return;
        if (winner) return;


        cell[index] = 'X';
        const magicHumanScoreTemp = [...magicHuman, magicBoard[index]]
        await setMagicHuman(magicHumanScoreTemp);
        if (await isWinning(magicHumanScoreTemp)) {
            await setWinner('Human');
            return;
        }

        const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/play', {
            index,
            cell,
            humanScore: magicHumanScoreTemp,
        });
        if (data.status === 'continue') {
            cell[data.choice] = '0';
            const magicIaTemp = [...magicIa, magicBoard[data.choice]]
            await setMagicIa(magicIaTemp);
            await setCell([...cell])
            if (await isWinning(magicIaTemp)) {
                await setWinner('Ia');
                return;
            }
        }


    }

    async function reset() {
        await setCell(Array(9).fill(null))
        await setIsX(true)
        await setWinner('')
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
