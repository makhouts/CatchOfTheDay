import React from 'react';
import {Link} from 'react-router-dom';
import {getFunName} from '../helpers';

class StorePicker extends React.Component{
    state = {
        inputText: getFunName(),
    }
    goToStore = (event) => {
        //1. stop the form from submitting
        event.preventDefault();
        //2. get the text from input
        const storeName = this.state.inputText;
        //3.change the page to /store/what-ever-they-entered
        this.props.history.push(`/store/${storeName}`);

    }
    render() {
        return (
            <form className='store-selector' onSubmit={this.goToStore}>
                <h2>Please enter a store!</h2>
                <input type='text' required placeholder='Store Name' defaultValue={this.state.inputText} />
                <button type="submit">Visit Store</button>
                
            </form>
        )
    }
}

export default StorePicker;