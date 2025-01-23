import React from 'react'
import styled from 'styled-components';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id, 
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type 
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className='icon'>
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className='content'>
                <h5>{title}</h5>
                <div className='inner-content'>
                    <p>{dollar} 45</p>
                    <p>{calender} {date}</p>
                    <p>
                        {comment}
                        {description}
                    </p>
                </div>
                <div className='btn-con'>
                    <Button
                        icon={trash}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                    />
                </div>
            </div>
        </IncomeItemStyled>
    )
}

export default IncomeItem