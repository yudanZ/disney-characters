import React from 'react';
import Cart from './cart.component';

const CartList = ({characters}) => {
    
    return (
        <div>
           { 
            characters.map((character, index) => {
                return (
                    <Cart 
                        key={index} 
                        id={character._id} 
                        name= {character.name} 
                        imageUrl= {character.imageUrl} 
                    />
                    ) 
                }) 
             }
        </div>
    );
}

export default CartList;