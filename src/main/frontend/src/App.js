// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Link, Route} from "react-router-dom";

function App() {
    const [data, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {data}
        </div>
    )
    // return (
    //     <BrowserRouter>
    //         <div>
    //             <ul>
    //                 <li>
    //                     <Link to={"/world"}> 백엔드에서 가져온 데이터입니다 : {data} </Link>
    //                 </li>
    //                 <li>
    //                     <Link to={"/hello"}> 백엔드에서 가져온 데이터입니다 : {data} </Link>
    //                 </li>
    //             </ul>
    //         </div>
    //         <switch>
    //             <Route path={"/world"} exact={true}>
    //                 <world/>
    //             </Route>
    //             <Route path={"/hello"} exact={true}>
    //                 <hello/>
    //             </Route>
    //         </switch>
    //     </BrowserRouter>
    // );
}

export default App;