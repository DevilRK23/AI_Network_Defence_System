import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {

  const [threats, setThreats] = useState([])

  useEffect(() => {

    axios.get('https://ai-network-backend.onrender.com/threats')

      .then(response => {
        setThreats(response.data)
      })

      .catch(error => {
        console.log(error)
      })

  }, [])

  return (

    <div style={{
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      color: 'white',
      padding: '20px'
    }}>

      <h1>AI Network Threat Dashboard</h1>

      {
        threats.map((threat, index) => (

          <div
            key={index}
            style={{
              border: '1px solid gray',
              padding: '15px',
              marginTop: '10px',
              borderRadius: '10px'
            }}
          >

            <p>Source: {threat.source_ip}</p>

            <p>Destination: {threat.destination_ip}</p>

            <p>Packet Size: {threat.packet_size}</p>

            <p style={{
              color:
                threat.status === 'Suspicious'
                  ? 'red'
                  : 'lightgreen'
            }}>

              Status: {threat.status}

            </p>

          </div>

        ))
      }

    </div>

  )
}

export default Dashboard