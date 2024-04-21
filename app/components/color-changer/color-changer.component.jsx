"use client"
import { useState } from "react";

export default function ColorChanger() {
  const [color, setColor] = useState('bg-white');

  const changeColor = () => {
    const colors = [
      'bg-green-400',
      'bg-blue-400',
      'bg-indigo-400',
      'bg-red-400',
      'bg-yellow-400',
      'bg-white'
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length -1)]
    setColor(randomColor);
  }
  const onClickHandler = () => {
    changeColor();
  }

  return (
    <div className={`w-screen h-screen ${color} flex`}>
      <h1 className="p-5 mx-auto my-auto" onClick={() => onClickHandler()}>Shop</h1>
      <p className="text-white  p-5 mx-auto my-auto">enter website</p>
    </div>
  )
}
