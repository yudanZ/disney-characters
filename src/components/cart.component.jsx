import React from 'react';

const Cart = (props) => (
    <div className='bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-s'>
        <img src={props.imageUrl} alt='My Friends' style= {{width: '200px', height: '200px'}}></img>
        <div>
            <h2>{props.name}</h2>
            
        </div>
    </div>
)

export default Cart;