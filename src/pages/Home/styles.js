import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  posts: {
    marginTop: '50px',
    overflowY: 'auto',
    height: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
    },
  },
}))