import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import { RecoilRoot } from 'recoil';
import Calendar from './containers/Calendar';
import './index.css';


const App: React.FunctionComponent<{}> = hot(() => {
    return (
        <RecoilRoot>
            <Calendar />
        </RecoilRoot>
    )
})

render(<App />, document.getElementById('root'))