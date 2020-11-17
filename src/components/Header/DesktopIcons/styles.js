import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'none',
    paddingRight: '10px',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
  },
}))