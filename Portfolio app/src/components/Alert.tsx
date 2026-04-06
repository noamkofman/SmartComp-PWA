import {ReactNode} from 'react'
interface Props {
    children: ReactNode;
}
const Alert = ({children}: Props) => {
  return (
    <div>
      <div className="alert alert-primary">{children}</div>
    </div>
  )
}

export default Alert
