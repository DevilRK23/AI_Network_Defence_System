import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Dashboard() {

  const [threats, setThreats] = useState([])

  useEffect(() => {

    const fetchThreats = () => {

      axios.get('https://ai-network-backend.onrender.com/threats')

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

  const suspiciousCount = threats.filter(
    t => t.status === 'Suspicious'
  ).length

  const normalCount = threats.filter(
    t => t.status === 'Normal'
  ).length

  const chartData = [
    {
      name: 'Suspicious',
      value: suspiciousCount
    },
    {
      name: 'Normal',
      value: normalCount
    }
  ]

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

      {/* HEADER */}

      <div
        style={{
          backgroundColor: '#16a34a',
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >

        AI Threat Detection System Active

      </div>

      <h1
        style={{
          textAlign: 'center',
          fontSize: '55px',
          marginBottom: '30px'
        }}
      >

        AI Network Threat Dashboard

      </h1>

      {/* ANALYTICS CARDS */}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}
      >

        {/* TOTAL */}

        <div
          style={{
            flex: 1,
            minWidth: '250px',
            background:
              'linear-gradient(145deg,#1e293b,#0f172a)',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155',
            boxShadow:
              '0px 0px 20px rgba(0,0,0,0.5)'
          }}
        >

          <h2>Total Threat Logs</h2>

          <h1
            style={{
              fontSize: '45px'
            }}
          >

            {threats.length}

          </h1>

        </div>

        {/* SUSPICIOUS */}

        <div
          style={{
            flex: 1,
            minWidth: '250px',
            background:
              'linear-gradient(145deg,#1e293b,#0f172a)',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155',
            boxShadow:
              '0px 0px 20px rgba(0,0,0,0.5)'
          }}
        >

          <h2>Suspicious Threats</h2>

          <h1
            style={{
              fontSize: '45px',
              color: 'red'
            }}
          >

            {suspiciousCount}

          </h1>

        </div>

        {/* NORMAL */}

        <div
          style={{
            flex: 1,
            minWidth: '250px',
            background:
              'linear-gradient(145deg,#1e293b,#0f172a)',
            padding: '25px',
            borderRadius: '20px',
            border: '1px solid #334155',
            boxShadow:
              '0px 0px 20px rgba(0,0,0,0.5)'
          }}
        >

          <h2>Normal Traffic</h2>

          <h1
            style={{
              fontSize: '45px',
              color: 'lightgreen'
            }}
          >

            {normalCount}

          </h1>

        </div>

      </div>

      {/* PIE CHART */}

      <div
        style={{
          background:
            'linear-gradient(145deg,#1e293b,#0f172a)',

          padding: '25px',

          borderRadius: '20px',

          border: '1px solid #334155',

          marginBottom: '40px'
        }}
      >

        <h2
          style={{
            marginBottom: '20px'
          }}
        >

          Threat Analytics

        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >

              <Cell fill="red" />

              <Cell fill="green" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* THREAT CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(320px,1fr))',

          gap: '20px'
        }}
      >

        {
          threats.map((threat, index) => (

            <div
              key={index}

              style={{
                background:
                  'linear-gradient(145deg,#1e293b,#0f172a)',

                padding: '25px',

                borderRadius: '20px',

                border: '1px solid #334155',

                boxShadow:
                  '0px 0px 20px rgba(0,0,0,0.5)'
              }}
            >

              <h2
                style={{
                  marginBottom: '15px'
                }}
              >

                Threat #{index + 1}

              </h2>

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

              <p>

                <strong>Attack Type:</strong>

                {' '}

                {
                  threat.attack_type
                    || 'DDoS'
                }

              </p>

              <p>

                <strong>Risk Level:</strong>

                {' '}

                <span
                  style={{
                    color:
                      threat.packet_size > 5000
                        ? 'red'
                        : 'orange',

                    fontWeight: 'bold'
                  }}
                >

                  {
                    threat.packet_size > 5000
                      ? 'HIGH'
                      : 'MEDIUM'
                  }

                </span>

              </p>

              <p>

                <strong>Time:</strong>

                {' '}

                {
                  threat.timestamp
                    || 'Live'
                }

              </p>

              <p
                style={{
                  color:
                    threat.status === 'Suspicious'
                      ? 'red'
                      : 'lightgreen',

                  fontWeight: 'bold',

                  fontSize: '20px'
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