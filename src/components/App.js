import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../Base';

class App extends Component{
    state = {
        fishes: {},
        order: {},
    }

    componentDidMount() {
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate() {
      localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));  
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }



    addFish = (fish) => {
        //1. Make a copy of the state
        const fishes = {...this.state.fishes};
        //2. Add our new fish to the fishes.
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({fishes: fishes})
    }

    loadSampleFishes = () => {
        this.setState({fishes : sampleFishes});
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of state
        const fishes = {...this.state.fishes};
        // 2. Update the state 
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({fishes : fishes});

    }

    deleteFish = (key) => {
        //1. Take a copy of state
        const fishes = {...this.state.fishes}
        //2. Update the state
        fishes[key] = null;
        //3. update state
        this.setState({fishes})
    }

    removeFromOrder = (key) => {
          //1. Take a copy of state
          const order = {...this.state.order}
          //2. Remove item from order
          delete order[key]
          //3. update state
          this.setState({order})
    }

    addToOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order }
        //2. Either add to the order or update the number
        order[key] = order[key] + 1 || 1;
        //3.  call setstate
        this.setState({ order: order});
    }
 
    render() {
        return (
            <div className='catch-of-the-day'>
                <div className='menu'>
                    <Header tagline='fresh seafood market' />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => {
                            return <Fish
                             key={key}
                             details={this.state.fishes[key]}
                             addToOrder={this.addToOrder}
                             index={key}/>
                            
                        })}
                    </ul>
                    
                </div>

                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder} 
                />

                <Inventory 
                    loadSampleFishes={this.loadSampleFishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;