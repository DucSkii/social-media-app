import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '500px',
    },
  },
  uploadPost: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploadInfo: {
    padding: '5px',
    width: '200px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  uploadButton: {
    height: '40px',
    marginRight: '20px',
    [theme.breakpoints.up('sm')]: {
      margin: '10px',
    },
  },
  caption: {
    marginBottom: '5px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '45px',
      marginLeft: '45px',
    },
  },
}))