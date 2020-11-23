import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  profile: {
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
  container: {
    paddingTop: '20px',
  },
  detailContainer: {
    display: 'flex',
  },
  avatar: {
    width: '55px',
    height: '55px',
  },
  detailTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '13px',
  },
  detailNumber: {
    textAlign: 'center',
  },
  arrowIcon: {
    backgroundColor: 'RGBA(255,255,255,0.5)',
    borderRadius: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '15px',
      height: '15px',
    },
  },
  arrowRight: {
    width: "30px",
    marginLeft: "-48px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "-38px",
    },
  },
  // id: {
  //   display: 'flex',
  //   marginRight: '15px',
  //   flexDirection: 'column',
  // },
  // details: {
  //   display: 'flex',
  // },
  // detail: {
  //   margin: '0px 10px',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   textAlign: 'center',
  // },
}))