import { useRouter } from 'next/router'
import useAckee from 'use-ackee'

interface AckeeProps {
  ackeeServerUrl: string;
  ackeeDomainId: string;
}

const Ackee: React.FC<AckeeProps> = ({ ackeeServerUrl, ackeeDomainId }) => {
  const router = useRouter()
  useAckee(
    router.asPath,
    { server: ackeeServerUrl, domainId: ackeeDomainId },
    { detailed: false, ignoreLocalhost: true }
  )
  return null
}

export default Ackee
