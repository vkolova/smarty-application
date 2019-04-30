import React from 'react';

import MessageScreen from './MessageScreen';


const Error = props =>
  <MessageScreen
    icon='alert-circle'
    title={'Уф!'}
    body={'Възникна грешка. Затвори приложението и опитай отново.'}
  />

export default Error