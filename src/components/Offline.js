import React from 'react';

import MessageScreen from './MessageScreen';


const Offline = props =>
  <MessageScreen
    icon='wifi-off'
    title={'Опа!'}
    body={'Изглежда нямаш връзка с Интернет. Вържи се към Мрежата и пробвай отново!'}
  />

export default Offline