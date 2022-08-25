import type {NextPage} from 'next'
import {useState} from "react";
import Cell from "../components/cell";
import axios from 'axios';

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
        if (cell[index]) return;
        cell[index] = isX ? 'X' : '0';
        const magicHumanScoreTemp = [...magicHuman, magicBoard[index]]
        // const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/play', {
        //     index,
        //     cell,
        //     humanScore: magicHumanScoreTemp,
        // });
        // if (data.status === 'continue') {
        //     cell[data.choice] = '0';
        //     await setCell([...cell])
        // }
        // if (winner) return;


        await setMagicHuman(magicHumanScoreTemp);

        // await setIsX(false)
        // // if (await isWinning(magicHumanScoreTemp)) {
        // //     setWinner('X');
        // //     return false;
        // // }
        // await playBot(humanScoreTemp)
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
        // const play = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/play', {
        //     humanScore: magicHuman,
        //     iaScore: magicIa,
        //     cell,
        // });
        // const index = play.data;
        // const iaScoreTemp = [...iaScore, index]
        // cell[index] = '0';
        // const magicIaTemp = [...magicIa, magicBoard[index]]
        // await setMagicIa(magicIaTemp);
        // await setCell(cell)
        // await setIaScore(iaScoreTemp);
        // await setIsX(true)
        // // if (await isWinning(magicIaTemp)) {
        // //     setWinner('0');
        // //     return false;
        // // }
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
        // await setHumanScore([])
        // await setIaScore([])
        // await setMagicHuman([])
        // await setMagicIa([])
    }

    return (
        <main className={"md:container mt-20"}>
            <h1 className="text-5xl text-center">Tic-Tac-Tes</h1>
            <div className="flex justify-center flex-col mt-20">
                {/*{!winner ? <span*/}
                {/*    className={"text-1xl text-center text-center w-full"}>Au tour du joueur {isX ? 'X' : '0'}</span> : ''}*/}
                <div className={`games ${!isX ? 'disabled' : ''}`}>
                    <div className="grid grid-cols-3 grid-rows-3 gap-5">
                        {cell.map((cell, index) => {
                            return <Cell click={() => clickOnCell(index)} key={index} index={cell}/>
                        })}
                    </div>
                </div>
                <div className="actions">
                    {/*{winner ? <div className="mb-10 text-center text-2xl">{winner} a gagné</div> : null}*/}
                    <button className={"bg-amber-100 p-2 rounded"} onClick={() => reset()}>Reset</button>
                </div>
            </div>
        </main>
    )
}

export default Home
