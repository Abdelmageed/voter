import React, {Component} from 'react';

export default class Spinner extends Component {
    render() {
        const style = {
            marginLeft: '50%',
            color: 'deepskyblue',
        };
        
          return (
            <i 
                style={style}
                className="fa fa-circle-o-notch fa-5x fa-pulse fa-fw" />
        );
    }
}