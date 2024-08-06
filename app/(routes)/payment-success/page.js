import Image from "next/image"

import smileEmoji from './../../assets/payment/payment-success.svg'

const PaymentSuccess = () => {
  return (
  <div className='flex-row ] justify-center items-center'>
    <div className="mt-24 animate-bounce">
      <Image className="mx-auto" src={smileEmoji} height={200} width={200} alt="smile Emoji" />
    </div>
    <div className='text-[7vw] text-center mt-5 '>
      Your payment was Successful!
    </div>

  </div>  
)
}

export default PaymentSuccess