import React from 'react';
import { Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { EventRegister } from 'react-native-event-listeners';
import Sidebar from './Sidebar';

export default class SideBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);    
  }
  
  componentWillMount() {
    this.listener = EventRegister.addEventListener('menuToggle', () => {
      this.toggleMenu();
    })
  }
  
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }
  
  render() {
    return(
      <SideMenu
        isOpen={this.state.isMenuOpen}
        onChange={ (isOpen) => this.setState({ isMenuOpen: isOpen }) }
        menu={<Sidebar navigation={this.props.navigation}/>}>
        { React.cloneElement(this.props.children) }
      </SideMenu>
    )
  }
}
