import React from 'react'
import { Toolbar } from 'primereact/toolbar'

const footerText = 'Admin applikaatio depressiopotilailta kerätyn datan tarkasteluun, Helsingin yliopiston ohjelmistotuotantoprojekti, kevät 2021'

const footerStyle = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  marginTop: '10vh'
}

const toolbarStyle = {
  backgroundColor: '#d1e8e6'
}

const leftContents = (
  < React.Fragment >
    <p><i>{footerText}</i></p>
  </React.Fragment>
)

const AppFooter = () => {
  return (
    <div style={footerStyle}>
      <Toolbar left={leftContents} style={toolbarStyle} />
    </div>
  )
}

export default AppFooter