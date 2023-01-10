// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function world() {
    const [data, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/world')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {data}
        </div>
    );
}

export default App;