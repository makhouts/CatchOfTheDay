import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase, { auth } from 'firebase';
import base, { firebaseApp } from '../Base';

class Inventory extends Component{

    state = {
        uid: null,
        owner: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        const store = base.fetch(this.props.storeId, { context: this});
        if(!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        this.setState({
            uid: authData.user.uid, 
            owner: store.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null })
    }


    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        if(this.state.uid !== this.state.owner) {
            return <div>
                <p>Sorry you are not the owner of this store.</p>
                {logout}
            </div>
        }
        return(
            <div className='inventory'>
               <h2>Inventory!!</h2>
               {logout}
               {Object.keys(this.props.fishes).map(key => <EditFishForm
                    key={key}
                    index={key}
                    fish={this.props.fishes[key]}
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish} />)}
               <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
};

export default Inventory;