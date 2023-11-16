import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul
      style={{
        display: 'flex',
        gap: 20
      }}
    >
      <li
        style={{
          width: '15%'
        }}
      >
        Electron <br /> v{versions.electron}
      </li>
      <li
        style={{
          width: '24%'
        }}
      >
        Chromium <br /> v{versions.chrome}
      </li>
      <li
        style={{
          width: '15%'
        }}
      >
        Node <br /> v{versions.node}
      </li>
      <li style={{}}>
        V8 <br /> v{versions.v8}
      </li>
    </ul>
  )
}

export default Versions
