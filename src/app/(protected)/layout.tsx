export const dynamic = 'force-dynamic'

import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"


type Props = {
    children : React.ReactNode
}

const layout = async(props: Props) => {
    const auth  = await onAuthenticateUser()
    if(!auth.user) redirect('/sign-in')
  return (
    <div className="ww-full min-h=screen">
        {props.children}
    </div>
  )
}

export default layout