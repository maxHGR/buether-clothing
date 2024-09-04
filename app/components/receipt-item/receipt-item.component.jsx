import React from 'react'
import Image from 'next/image';

export const ReceiptItem = ({ item, date, expandedReceipt, toggleReceipt }) => {

  const totalPurchasePrice = item[1].purchasedItems.reduce((total, { price, quantity }) => total + (price * quantity), 0);

  return (
    <div onClick={() => toggleReceipt(date)} key={date} className='mb-4 flex flex-col items-center bg-white rounded-lg p-4 shadow-md w-72  mx-auto'>
      <h2 className='text-center p-2 mb-5'>{date}</h2>
      {expandedReceipt === date ? (
          null
        ) : (
          <button onClick={() => toggleReceipt(date)}>=</button>
        )
      }
      {expandedReceipt === date && (
        <>
          {item[1].purchasedItems.map(({ name, id, imageUrl, price, quantity }) => {
            return (
              <div key={id} className='flex flex-col gap-y-2 items-center mb-2 border-b border-black w-44 p-1'>
              <Image src={imageUrl} alt={name} width={100} height={100}/>
              <div className='flex flex-col justify-center items-center text-sm'>
                <h3 className=''>{name}</h3>
                <p>Price: ${price}</p>
                <p>Quantity: {quantity}</p>
              </div>
            </div>
            )
          })}
          <h3 className='text-center'>Total Purchase Price: ${totalPurchasePrice.toFixed(2)}</h3>
        </>
      )}
    </div>
  )
}

export default ReceiptItem