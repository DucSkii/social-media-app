import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  posts: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
    },
  },
}))