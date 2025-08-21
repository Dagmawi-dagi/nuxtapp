import { DialogToast,DialogMessage } from 'v-dialogs';

export default ()=>{

  const err = (err)=>{
    DialogToast(`${err}`,{
      messageType:'error',
      closeButton:true,
      placement:'top-right',
      duration:5000,
      customClass: 'global_error',
    })
  }

  const success = (msg)=>{
    DialogMessage(`${msg}`,{ 
      messageType: 'success',
      icon:true,
      placement:"top",
      duration:5000,
      customClass: 'global_success', 
      closeButton:true,
      pill:false
    })
  }

  return {
    err,
    success
  }
}