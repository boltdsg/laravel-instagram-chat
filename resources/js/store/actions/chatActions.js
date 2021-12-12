import axios from 'axios';

export const loadP2PChat = (data) => async (dispatch) => {

    await axios({
        method: 'POST',
        url: '/p2p',
        data
    });

}