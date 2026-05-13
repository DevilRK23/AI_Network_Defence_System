import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

function Dashboard() {

  const [threats, setThreats] = useState([])

  useEffect(() => {

    const fetchThreats = () => {

      axios.get('http://127.0.0.1:8000/threats')

        .then(response => {

          setThreats(response.data)

        })

        .catch(error => {

          console.log(error)

        })
    }

    fetchThreats()

    const interval = setInterval(fetchThreats, 3000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div
      style={{
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        padding: '30px',
        color: 'white',
        fontFamily: 'Arial'
      }}
    >

      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '40px'
        }}
      >
        AI Network Threat Dashboard
      </h1>

      {/* STATS SECTION */}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}
      >

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '15px',
            width: '250px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
          }}
        >

          <h2>Total Packets</h2>

          <p style={{ fontSize: '30px' }}>
            {threats.length}
          </p>

        </div>

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '15px',
            width: '250px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
          }}
        >

          <h2>Suspicious Threats</h2>

          <p
            style={{
              fontSize: '30px',
              color: 'red'
            }}
          >

            {
              threats.filter(
                threat => threat.status === 'Suspicious'
              ).length
            }

          </p>

        </div>

      </div>

      {/* CHART SECTION */}

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px'
        }}
      >

        <h2 style={{ marginBottom: '20px' }}>
          Network Packet Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={threats}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="source_ip" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="packet_size" />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* THREAT CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}
      >

        {
          threats.map((threat, index) => (

            <div
              key={index}

              style={{
                backgroundColor: '#1e293b',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
              }}
            >

              <h3>Threat #{index + 1}</h3>

              <p>
                <strong>Source IP:</strong>
                {' '}
                {threat.source_ip}
              </p>

              <p>
                <strong>Destination IP:</strong>
                {' '}
                {threat.destination_ip}
              </p>

              <p>
                <strong>Packet Size:</strong>
                {' '}
                {threat.packet_size}
              </p>

              <p
                style={{
                  color:
                    threat.status === 'Suspicious'
                      ? 'red'
                      : 'lightgreen',

                  fontWeight: 'bold'
                }}
              >

                Status:
                {' '}
                {threat.status}

              </p>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default Dashboard