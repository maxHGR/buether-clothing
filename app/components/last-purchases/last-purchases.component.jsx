'use client'
import { useEffect, useState } from 'react'
import { getCollection } from '/app/utils/firebase.utils'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '/app/store/user/user.selector'
import Image from 'next/image'
import ReceiptItem from '../receipt-item/receipt-item.component'

export const LastPurchases = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [receipts, setReceipts] = useState();
  const [expandedReceipt, setExpandedReceipt] = useState("");

  const toggleReceipt = (date) => {
    setExpandedReceipt(expandedReceipt === date ? "" : date);
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
            });
            
            return (
              <ReceiptItem 
                key={date}
                item={item}
                date={date}
                expandedReceipt={expandedReceipt}
                toggleReceipt={toggleReceipt}
              />
            )
          })}
        </div>
      ) : (
        <p>No receipts found</p>
      )}
    </div>
  );
}

export default LastPurchases