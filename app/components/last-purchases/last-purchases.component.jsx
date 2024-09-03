'use client'
import { useEffect, useState } from 'react'
import { getCollection } from '/app/utils/firebase.utils'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '/app/store/user/user.selector'
import Image from 'next/image'

export const LastPurchases = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [receipts, setReceipts] = useState();
  const [expandedReceipt, setExpandedReceipt] = useState("");

  const toggleReceipt = (date) => {
    console.log(date)
    //if (expandedReceipt === date) return;

    setExpandedReceipt(date);
  }
  
  useEffect(() => {
    const retrieveReceipts = async() => {
      let collection = await getCollection(currentUser.uid);
      setReceipts(collection);
    }
    retrieveReceipts();
  }, [])

  const receiptHandler = async() => {
    const retrieveReceipts = async() => {
      const collection = await getCollection(currentUser.uid);
      setReceipts(collection);
    }
    retrieveReceipts();
  }

  return (
    <div>
      { receipts ? (
        <div className='flex flex-col items-center gap-y-8'>
          <h2 className='mb-8 text-2xl tracking-wider'>Last Purchases</h2>
          {receipts.map((item) => {

            const date = new Date(item[0]).toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
          }); // Format the date with time
          console.log(date)
            const totalPurchasePrice = item[1].purchasedItems.reduce((total, { price, quantity }) => total + (price * quantity), 0);
            // map() extracts the name, price,... from the passed in product object
            return (
              <div onClick={() => toggleReceipt(date)} key={date} className='mb-4 flex flex-col items-center bg-white rounded-lg p-4 shadow-md w-72  mx-auto'>
                <h2 className='text-center p-2 mb-5'>{date}</h2>
                {
                  expandedReceipt === date ? (
                    null
                  ) : (
                    <button onClick={() => toggleReceipt(date)}>=</button>
                  )
                }
                {
                  expandedReceipt === date && (
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
                  )


                
                }
              </div>
              
            );
          })}
        </div>
      ) : (
        <p>No receipts found</p>
      )}
    </div>
  );
}

export default LastPurchases