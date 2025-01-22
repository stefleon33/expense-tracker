import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';

function Expenses() {
    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
            </InnerLayout>
        </ExpensesStyled>
    )
}

const ExpensesStyled = styled.div`

`;

export default Expenses