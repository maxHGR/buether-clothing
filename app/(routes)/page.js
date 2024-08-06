import Image from "next/image"

import beatherLogo from "./../assets/icons/logo/logo-color.png"

export default function Home() {
  return (
    <div className="h-[100vh] flex justify-center items-center ">
      <Image height={800} width={800} src={beatherLogo} alt="Beather Logo"/>
    </div>
  )
}
