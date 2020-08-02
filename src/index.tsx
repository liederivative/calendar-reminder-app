import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import { RecoilRoot } from 'recoil';

import './index.css';


const App: React.FunctionComponent<{}> = hot( () => {
    return (
        <RecoilRoot>
                
        </RecoilRoot>
    )
})

render(<App />, document.getElementById('root'))