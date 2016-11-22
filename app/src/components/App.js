import React from 'react'
import Board from './Board'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


const App = () =>{
  return(
    <MuiThemeProvider>
      <Board />
    </MuiThemeProvider>
  )
}
export default App
