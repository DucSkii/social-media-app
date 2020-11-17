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
  uploadImage: {
    width: '100%',
    height: '25px',
    fontSize: '13px',
    minWidth: '140px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '200px',
      marginRight: '20px'
    },
  },
  imagePreview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      margin: '0',
    },
  },
  imagePreviewContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      justifyContent: 'space-evenly',
    },
  },
  removeImage: {
    padding: '0',
    margin: '0',
    marginTop: '5px',
    fontSize: '10px',
    [theme.breakpoints.up('sm')]: {
      margin: '0',
      fontSize: '13px',
      padding: '2px 15px',
    },
  },
  imageCount: {
    fontSize: '12px',
    padding: '3px',
    borderRadius: '20px',
    backgroundColor: 'RGBA(0,0,0,0.2)',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
      margin: '0px 10px',
      padding: '8px',
    },
  },
  image: {
    width: '40px',
    maxHeight: '30px',
    marginTop: '2px',
    marginRight: '5px',
    [theme.breakpoints.up('sm')]: {
      width: '60px',
      maxHeight: 'none',
      margin: '0',
    },
  },
}))