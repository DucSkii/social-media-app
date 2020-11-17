import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
  },
  button: {
    padding: '0',
    margin: '0',
    width: '50px',
    height: '50px',
  },
  link: {
    textDecoration: 'none',
  },
}))