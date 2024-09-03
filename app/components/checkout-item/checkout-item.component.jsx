import Image from 'next/image'
import { useDispatch } from 'react-redux';
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../store/cart/cart.reducer';


const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemHandler = () => {
    dispatch(addItemToCart(cartItem));
  }
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <div className='flex justify-around items-center border-b border-black p-2 h-20'>
      <div>
        <Image src={imageUrl} alt={`${name}`} width={40} height={40}/>
      </div>
      <span className='w-1/5'>{name}</span>
      <div className='flex justify-between w-1/6 cursor-pointer'>
        { quantity <= 1 ? (
            <div onClick={clearItemHandler}>&#x1F5D1;</div>
          ) : (
            <div onClick={removeItemHandler}>&#10094;</div>
          )
        }
        {quantity}
        <div onClick={addItemHandler}>&#10095;</div>
      </div>
      <div>{(price * quantity).toFixed(2)}</div>
      <br/>
      <button className='cursor-pointer' onClick={clearItemHandler}>&#10005;</button>
    </div>
  )
}

export default CheckoutItem