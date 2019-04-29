import React from 'react';

import MessageScreen from './MessageScreen';


const Error = props =>
  <MessageScreen
    icon='alert-circle'
    title={'Уфф!'}
    body={'Възникна грешка. Затвори приложението и опитай отново.'}
  />

export default Error