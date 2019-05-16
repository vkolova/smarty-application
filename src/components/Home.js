import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground
} from 'react-native';
import { SecureStore } from 'expo';
import { Icon } from 'react-native-elements';

import logo from '../../assets/icon.png';

import Navigation from './Navigation';
import Avatar from './Avatar';

import request from '../request';
import { u } from '../utils';
import common from '../styles/common';

import registerForPushNotificationsAsync from '../../registerForPushNotificationsAsync';

export default class Home extends React.Component {
	state = {
		player: '',
		user: null,
		showFriendInput: false
	}

	componentDidMount () {
		registerForPushNotificationsAsync();

		SecureStore.getItemAsync('user')
			.then(user => {
				if (user) {
					user = JSON.parse(user);
					this.setState({ user })
				}
			})
	}

  toggleFriendInput = () => {
    this.setState({ showFriendInput: !this.state.showFriendInput })
  }

  onPlayerChange = text => this.setState({ player: text })

  randomPlayer = () => {
    SecureStore.getItemAsync('user')
    .then(user => {
      if (user) {
        user = JSON.parse(user)
        request.defaults.headers.common.Authorization = `Token ${user.token}`;

        request
          .post('/api/games/')
          .then(result => {
              this.props.history.push(`/game/${result.data.channel}/`)
          })
          .catch(error => console.log(error))
      }
    })
    .catch(err => console.log(err))
  }

  chosenPlayer = () => {
    SecureStore.getItemAsync('user')
    .then(user => {
      if (user) {
        user = JSON.parse(user)
        request.defaults.headers.common.Authorization = `Token ${user.token}`;

        request
          .post('/api/games/', {
              username: this.state.player
          })
          .then(result => {
              this.props.history.push(`/game/${result.data.channel}/`)
          })
          .catch(error => console.log(error))
      }
    })
    .catch(err => console.log(err))
  }

	render () {
		const { user } = this.state;

		return (
			<React.Fragment>
				<ImageBackground source={require('../../assets/bg-2.png')} style={common.pageWithImage}>
					<View style={common.pageWrapper}>
						<View style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<Image source={logo} style={{ width: 50, height: 50 }}/>
							{
								user &&
									<View style={{ display: 'flex', flexDirection: 'row'}}>
										<View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
											<Text style={{ color: '#000' }}>{user.user.user.username}</Text>
											<Text style={{ color: '#333', fontSize: 11 }}>{ u(`${user.user.level} ниво`) }</Text>
										</View>
										<Avatar size={50} url={user.user.avatar}/>
									</View>
							}
						</View>

						<View style={{ width: '100%', display: 'flex', flex: 7, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<Text onPress={this.randomPlayer} style={common.btnPrim}>
								{ u('Дуел с непознат') }
							</Text>
							{
								!this.state.showFriendInput &&
								<Text onPress={this.toggleFriendInput} style={common.btnPrim}>
									{ u('игра с приятел') }
								</Text>
							}

							{
								this.state.showFriendInput &&
								<View style={{ width: '70%', paddingTop: 15, paddingBottom: 15,  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
									<TextInput
										autoCorrect={false}
										onChangeText={this.onPlayerChange}
										value={this.state.player}
										label={'играч'}
										style={{
											width: '100%',
											borderBottomWidth: 1,
											borderColor: '#191919',
											color: '#191919',
											backgroundColor: 'transparent'
										}}
										blurOnSubmit      
									/>
									<Icon
										onPress={this.chosenPlayer}
										name={'feather'}
										type='send'
										style={{
											top: 0,
											marginRight: 25,
											color: '#707070',
											position: 'absolute'
										}}
									/>
								</View>
							}
						</View>
					</View>
				</ImageBackground>

				<Navigation/>
			</React.Fragment>
		);
	}
}