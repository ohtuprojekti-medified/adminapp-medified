import React from 'react'
import { Toolbar } from 'primereact/toolbar'

const footerText = 'Admin applikaatio depressiopotilailta kerätyn datan tarkasteluun, Helsingin yliopiston ohjelmistotuotantoprojekti, kevät 2021'

const footerStyle = {
  position: 'absolute',
  width: '100%'
}

const leftContents = (
  < React.Fragment >
    <p><i>{footerText}</i></p>
  </React.Fragment>
)

const AppFooter = () => {
  return (
    <div style={footerStyle}>
      <Toolbar left={leftContents} />
    </div>
  )
}

export default AppFooter