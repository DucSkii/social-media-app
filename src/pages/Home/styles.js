import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  posts: {
    overflowX: 'hidden',
    marginTop: '50px',
    overflowY: 'auto',
    height: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))