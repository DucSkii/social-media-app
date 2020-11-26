import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  profile: {
    paddingTop: '50px !important',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  paper: {
    height: 'calc(100vh - 50px)',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '960px',
    },
  },
  avatar: {
    height: '70px',
    width: '70px',
  },
  button: {
    padding: '7px',
    margin: '0',
  },
  changeButton: {
    fontSize: '12px',
    minWidth: '170px',
    height: '30px',
  },
  changePicture: {
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    }
  },
  gridBreakpoint: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  gridButtonContainer: {
    justifyContent: 'space-around',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  gridButton: {
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    },
  },
  smHidden: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  postBannerColour: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
  },
  postBannerConfirm: {
    width: '50px',
    height: '50px',
    borderRadius: '5px'
  },
}))