import Image from 'next/image'
import Link from 'next/link';
import ShoppingIcon from '../../assets/shopping-bag.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';


const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div onClick={toggleIsCartOpen} className='cursor-pointer relative w-18 h-18 flex items-center justify-center'>
      <Image className='relative w-12' src={ShoppingIcon} width={24} height={24} alt='shopping bag' />
      <div className='absolute mt-4'>{cartCount}</div>
    </div>
  )
}

export default CartIcon