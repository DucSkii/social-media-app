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
  modal: {
    position: 'absolute',
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
}))