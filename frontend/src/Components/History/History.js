import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function History(){
    
    const {transactionHistory} = useGlobalContext()
    const [...history] = transactionHistory();

    return(

        <HistoryStyled>
            <h2>Historial más reciente</h2>
            {history.map( (item) => {
                const {_id, title, amount, type} = item
                return (
                    <div className="history-item" key={_id}>
                        <p style={{color: type === 'egresos' ? 'red' : 'green'}}>
                            {title}
                        </p>
                        <p style={{color: type === 'egresos' ? 'red' : 'green'}}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `
export default History;