import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  avatar: {
    width: '30px',
    height: '30px',
    [theme.breakpoints.up('sm')]: {
      width: '35px',
      height: '35px',
    },
    [theme.breakpoints.up('md')]: {
      width: '40px',
      height: '40px',
    },
  },
  link: {
    textDecoration: 'none',
  },
}))