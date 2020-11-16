import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  profile: {
    paddingTop: '50px !important',
    width: '100%',
  },
  paper: {
    height: 'calc(100vh - 50px)',
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