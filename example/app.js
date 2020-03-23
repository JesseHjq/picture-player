import React from 'react';
import { render } from 'react-dom';
import ReactDemo from '../src'; // 引入组件
import './app.less';

const App = () => <ReactDemo />;
render(<App />, document.getElementById('root'));
