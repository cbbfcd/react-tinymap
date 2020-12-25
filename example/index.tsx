import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TinyMap from '../src';
import './index.css'
import { Block } from './block';
import {FpsView} from "react-fps";

const App = () => {
  const [checked, updateChecked] = React.useState(false)
  const [placement, updatePlacement] = React.useState('topRight')
  return (
    <div className='container'>
      <FpsView height={90}/>
      <div className='header'>
        <h1>React TinyMap</h1>
        <div className='operation'>
          <div className='oper-item'>
            <label>keepAspectRatio</label>
            <input type='checkbox' defaultChecked={false} onChange={e => updateChecked(e.target.checked)}/>
          </div>
          <div className='oper-item'>
            <label>placement</label>
            <select onChange={e => updatePlacement(e.target.value)}>
              <option value='topLeft'>topLeft</option>
              <option value='topRight'>topRight</option>
              <option value='bottomLeft'>bottomLeft</option>
              <option value='bottomRight'>bottomRight</option>
            </select>
          </div>
        </div>
      </div>
      <TinyMap placement={placement as any} selector='.box' keepAspectRatio={checked} miniMapClassName='view'>
        <Block label='Yello' className='orange' color='orange' style={{position: 'absolute', left: '400px', top: '100px'}}/>
        <Block label='Blue' className='orange' color='green' style={{position: 'absolute', left: '800px', top: '50px'}}/>
        <Block label='Blue' className='orange' color='green' style={{position: 'absolute', left: '100px', top: '800px'}}/>
        <Block label='Pink' className='orange' color='pink' style={{position: 'absolute', left: '1200px', top: '600px'}}/>
        <Block label='Yello' className='orange' color='orange' style={{position: 'absolute', left: '4000px', top: '500px'}}/>
        <Block label='Pink' className='orange' color='pink' style={{position: 'absolute', left: '20px', top: '1000px'}}/>
      </TinyMap>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
