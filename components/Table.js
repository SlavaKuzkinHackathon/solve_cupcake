import { useGetContext } from '../lib/hooks'
import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

const Table = () => {
    const {signs, exrates} = useGetContext()

    return (
        <Container>
            <div>
                { ! exrates
                        ? <h2>Ждём-с...</h2>
                        :
                        <table className='table'>
                            <thead>
                                <tr>
                                    {signs.length && signs.map((sign, index) => (
                                        <td key={index}>{sign}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {exrates && exrates.map((exrate, index) => (
                                    <tr key={index}>
                                        <td>{exrate.name}</td>
                                        <td className={classnames(exrate.first.lowest && 'lowest-exrate')}>{exrate.first.value}</td>
                                        <td className={classnames(exrate.second.lowest && 'lowest-exrate')}>{exrate.second.value}</td>
                                        <td className={classnames(exrate.third.lowest && 'lowest-exrate')}>{exrate.third.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
            </div>
        </Container>
    )
}

export default Table



const Container = styled.div`
    display: flex;
    justify-content: space-between,center;
    max-width: 650px;
    margin: 10px auto 0;
    
    .table {
        border-collapse: collapse;
        background-color: #fdfdfd;
        margin: 0 auto;
        margin-top: 10px;
        width: 100%;
        max-width: 610px;
        height: 500px;
        table-layout: fixed;
    }
    td,th,.cell {
        border: 5px solid #909090;
        height: 70px;
        text-align: center;
        font-size: 21px;
        font-weight: 200;
        width: 31%;
    }
    .lowest-exrate {
        background: #0b08b9;
        color: white;
    }
`;
