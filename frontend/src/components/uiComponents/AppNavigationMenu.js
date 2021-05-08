/**.
 * Component for navigation menu
 *
 * @module frontend/src/components/uiComponents/AppNavigationMenu
 * @requires react
 * @requires react/useRef
 * @requires primereact/menu
 * @requires primereact/button
 * @requires react-router-dom/useHistory
 * @requires frontend/src/components/MoodFilter
 * @exports AppNavigationMenu - Navigation menu
 */
import React, { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'

/**.
 * Component for navigation menu
 *
 * @constant
 * @function
 * @memberof module:frontend/src/components/uiComponents/AppNavigationMenu
 * @returns {object} - JSX NavigationMenu component
 */
const AppNavigationMenu = () => {
  const menu = useRef(null)

  let history = useHistory()

  /**.
   * Tells react router where to route when pressing menu button
   *
   * @type {Array}
   * @memberof module:frontend/src/components/uiComponents/AppNavigationMenu
   * @inner
   */
  const items = [
    {
      label: 'Navigate',
      items: [
        {
          label: 'All graphs',
          icon: 'pi pi-fw pi-home',
          command: () => { history.push('/') }
        },
        {
          label: 'Retention rates',
          icon: 'pi pi-fw pi-chart-bar',
          command: () => { history.push('/retention') }
        },
        {
          label: 'New and active users',
          icon: 'pi pi-fw pi-chart-bar',
          command: () => { history.push('/cumulative') }
        },
        {
          label: 'Mood improvement',
          icon: 'pi pi-fw pi-chart-bar',
          command: () => { history.push('/moodimprovement') }
        }
      ]
    }
  ]

  return (
    <div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button label="Navigation" icon="pi pi-map" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
    </div>
  )
}

export default AppNavigationMenu