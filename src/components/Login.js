import React from 'react';

const Login = (props) => {
    return(
        <nav className='login'>
            <h2>Inventory Login</h2>
            <p>Sign in to manage your store's Inventory</p>
            <button className='google' onClick={() => props.authenticate('Google')}>Login with Google </button>
            <button className='facebook' onClick={() => props.authenticate('Facebook')}>Login with Facebook </button>

        </nav>
    )
}

export default Login;