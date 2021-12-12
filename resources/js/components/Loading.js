import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner } from 'reactstrap';
import { CLEAR_CLICK } from '../store/actions/types';

function Loading() {
    const dispatch = useDispatch();
    const { userClicked } = useSelector(state => state.user);

    useEffect(() => {
        if (userClicked) {
            setTimeout(() => {
                dispatch({ type: CLEAR_CLICK })
            }, [1200])
        }
    }, [userClicked])

    return (
        <Container className='container'>
            <div className="loading">
                <Spinner size="sm" color="primary" />
            </div>
        </Container>
    )
}

export default Loading
