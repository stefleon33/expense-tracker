import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../contexts/globalContext';
import Form from '../Form/Form';

function Incomes() {
    const {addIncome,incomes,getIncomes} = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [incomes])

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <div className='incomes-content'>
                    <div className='form-container'>
                        <Form></Form>
                    </div>
                    <div className='incomes'>

                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    )
}

const IncomesStyled = styled.div`
    display: flex;
    overflow: auto;
    .incomes-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Incomes