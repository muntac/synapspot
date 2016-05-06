import React from 'react';
import { Component } from 'react';
import Rebase from 're-base';
import Header from './header';

export default class App extends Component {
  // componentWillMount(){
  //   console.log("Mounting");
  //   var base = Rebase.createClass('https://luminous-torch-4088.firebaseio.com/');
  //   base.push('bears', {data:{name:'Muntasir', type:'Shomit'}});
  // }
  //
  // componentDidMount() {
  //   var base = Rebase.createClass('https://luminous-torch-4088.firebaseio.com/');
  //   base.fetch('bears', {
  //     context: this,
  //     asArray: true,
  //     then(data){
  //       console.log(data);
  //     }
  //   });
  // }
  render() {
    return (
      <div>
        <Header />
        
        {this.props.children}
      </div>
    );
  }
}
