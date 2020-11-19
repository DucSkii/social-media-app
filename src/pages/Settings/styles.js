import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  settings: {
    marginTop: '50px',
  },
  darkMode: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  colorTheme: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  colors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 50px)',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      padding: '5px',
    },
  },
  colorBlack: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    margin: '10px',
  },
  colorBlue: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#0057F5',
    margin: '10px',
  },
  colorPink: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#F960AD',
    margin: '10px',
  },
  colorPurple: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#F100F5',
    margin: '10px',
  },
  colorLime: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#72EA30',
    margin: '10px',
  },
  colorOrange: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#F7A843',
    margin: '10px',
  },
  colorTurquoise: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#2DE1A1',
    margin: '10px',
  },
  colorRed: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#F63140',
    margin: '10px',
  },
  colorCyan: {
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    backgroundColor: '#2DE8E5',
    margin: '10px',
  },
  currentTheme: {
    display: 'flex',
    padding: '15px',
    alignItems: 'center'
  },
}))