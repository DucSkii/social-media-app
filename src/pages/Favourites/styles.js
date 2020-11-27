import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    overflowX: 'hidden',
    marginTop: '50px',
    overflowY: 'auto',
    height: 'calc(100vh - 50px)',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  paper: {
    height: '100vh',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '960px'
    },
  },
  link: {
    textDecoration: 'none',
  },
}))