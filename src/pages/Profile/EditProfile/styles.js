import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  profile: {
    marginTop: '50px',
    width: '100%',
  },
  paper: {
    height: '100vh',
    width: '100%',
  },
  avatar: {
    height: '70px',
    width: '70px',
  },
  button: {
    padding: '0px 5px',
    margin: '0',
  },
  changeButton: {
    fontSize: '12px',
    minWidth: '170px',
    height: '30px',
  },
}))