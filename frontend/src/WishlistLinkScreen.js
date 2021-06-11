import React from 'react'
import {useStateValue} from ".StateProvider";

function WishlistLinkScreen() {
    const [{wishlistBasket}] = useStateValue();
    return (
        <div classNAme="wishlist">
            
        </div>
    )
}

export default WishlistLinkScreen;
