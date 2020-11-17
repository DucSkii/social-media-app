import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  avatar: {
    width: '27px',
    height: '27px',
  },
  buttonSignUp: {
    marginLeft: '5px',
    marginRight: '5px',
    height: '25px',
    fontSize: '12px',
    padding: '0',
    color: '#f50057',
    borderColor: '#f50057',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '10px',
      marginRight: '10px',
      height: '30px',
      fontSize: '15px',
      padding: '5px',
    },
  },
  buttonLogin: {
    height: '25px',
    padding: '0',
    color: '#3f51b5',
    [theme.breakpoints.up('sm')]: {
      height: '30px',
      fontSize: '15px',
      padding: '5px',
    },
  },
  modal: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  input: {
    width: '80%',
  },
  headerIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    position: 'fixed',
    top: '0',
    zIndex: '1000',
    height: '50px',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}))