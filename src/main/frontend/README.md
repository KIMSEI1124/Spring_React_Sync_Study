# React Install
원하는 폴더에서 터미널을 실행 시킨뒤 `npx create-react-app frontend	# npx create-reeact {프로젝트명}`를 하여 react 를 다운받는다.

정상적으로 설치가 되었는지 확인하기 위해서 `npm start`를 터미널에 입력시킨다.

# Spring Boot 연동하기
**Proxy 설정** ( [공식문서](https://create-react-app.dev/docs/proxying-api-requests-in-development/) )<br>
CORS 관련 오류를 방지하기 위해 `proxy`를 설정해준다.

`frontend`에서 필요한 모듈을 설치해준다.<br>
명령어 : `npm install http-proxy-middleware --save`

```js
// src/main/frontend/src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};
```

src/main/frontend/src/App.js의 내용을 지우고 아래의 코드로 교체한다.
```js
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
    );
}

export default App;
```