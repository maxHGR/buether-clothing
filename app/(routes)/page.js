import Image from "next/image"

import beatherLogo from "./../assets/icons/logo-color.png"

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center lg:h-[60vh] lg:mt-10">
      <Image src={beatherLogo} alt="Beather Logo"/>
    </div>
  )
}
