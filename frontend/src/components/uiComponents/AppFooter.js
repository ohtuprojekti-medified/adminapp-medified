/**.
 * Component for applications UI footer
 *
 * @module frontend/src/components/uiComponents/AppFooter
 * @requires react
 * @requires primereact/toolbar
 * @exports AppFooter - Page footer
 */
import React from 'react'
import { Toolbar } from 'primereact/toolbar'

const footerText = 'Medified Adminapp, Software engineering project, University of Helsinki, spring 2021'

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

/**.
 * Component for applications UI footer
 *
 * @memberof module:frontend/src/components/uiComponents/AppFooter
 * @returns {object} - JSX Footer component
 */
const AppFooter = () => {
  return (
    <div style={footerStyle}>
      <Toolbar left={leftContents} style={toolbarStyle} />
    </div>
  )
}

export default AppFooter