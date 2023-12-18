import React from 'react';
import { checkSession } from './src/utils/auth';

class SessionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleCheckSession = () => {
    this.setState({ loading: false }, () => {

        console.log(this.state.loading)
    });
  };

  componentDidMount() {
    checkSession(this.handleCheckSession);
  };


  render() {
    if(this.state.loading){
        return
    }


    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    );
  }
}

export const wrapRootElement = ({ element }) => (
  <SessionCheck>
    {element}
  </SessionCheck>
);