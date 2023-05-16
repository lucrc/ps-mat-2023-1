import React from "react";
import PageTitle from "../../components/ui/PageTitle";
import  TextField  from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from "../../utils/myfecth";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from "../../components/ui/Notification";
import { useNavigate } from "react-router-dom";
import Channel from "../../models/Channel";
import getValidationMessages from "../../utils/getValidationMessages";




export default function ChannelForm(){
    const API_PATH = '/channels'

    const navigate = useNavigate()

    const [state, setState] = React.useState({
        channel: {
          description: '',
          comission_fee: ''
        },
        errors: {},
        showWaiting: false,
        notif:{
            show: false,
            severity: 'success',
            message: ''
        } 
    })

    const {
        channel,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event) {
        const channelCopy = {...channel}
        channelCopy[event.target.name] = event.target.value
        setState({...state, channel: channelCopy})
    }
    function handleFormSubmit(event){
        
        event.preventDefault() //Evita que a página seja recarregada
        
        //Envia os dados para o back-end
        sendData()
    }
    async function sendData() {
        console.log('sendData')
        setState({...state, showWaiting: true, errors:{}})
        try{
            //Chama a validação da biblioteca Joi
           
            await Channel.validateAsync(channel, {abortEarly: false})
            
            await myfetch.post(API_PATH, channel)
            //Dar Feedback positivo e voltar para a listagem            
            setState({...state, 
                showWaiting: false,
                notif: {
                    severity: 'success',
                    show: true,
                    message: 'Novo item salvo com sucesso'
                }
            })
        }
        catch(error){
          const { validationError, errorMessages } = getValidationMessages(error)

            console.error(error)
            setState({
                ...state, 
                showWaiting: false,
                errors: errorMessages,
                notif: {
                    severity: 'error',
                    show: !validationError,
                    message: 'ERRO: ' + error.message
                }
            })
        //dar feedback negativo 
        }
    }
    function handleNotifClose (event, reason) {
        if (reason === 'clickaway') {
        return;
        }
        // Se o item foi salvo com sucesso, retorna à página de listagem
        if(notif.severity === 'success') navigate(-1)

        setState({...state, notif: {...notif, show: false}});
    };

    
    return(
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showWaiting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Notification 
                show={notif.show} 
                onClose={handleNotifClose}
                severity={notif.severity}
                >
                    {notif.message}    
            </Notification>   

            <PageTitle title="Cadastrar novo método de pagamento" />
            <div>{notif.severity}</div>
            <div>{channel.description}</div>
            <div>{channel.comission_fee}</div>

            <form onSubmit={handleFormSubmit}>
                <TextField  
                    label="Descrição" 
                    variant="filled" 
                    name="description" //Nome do campo da tabela
                    fullWidth
                    required
                    value={channel.description} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.description}
                    helperText={errors?.description}
                    

                />
                <TextField  
                    label="Taxa da operação" 
                    type="number"
                    fullWidth
                    required
                    variant="filled" 
                    name="comission_fee" //Nome do campo da tabela
                    value={channel.comission_fee} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.comission_fee}
                    helperText={errors?.comission_fee}

                />
                <Fab 
                    variant="extended" 
                    color="secondary"
                    type="submit"
                    >
                    <SendIcon sx={{ mr: 1 }} />
                    Enviar
                </Fab>
                
            </form>
            
        </>
    )
}

/*
import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import Channel from '../../models/Channel'
import Joi from 'joi'

export default function ChannelForm() {
  const API_PATH = '/payment_methods'

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    channel: {}, // Objeto vazio
    showWaiting: false,
    notif: {
      show: false,
      severity: 'success',
      message: ''
    }
  })
  const {
    channel,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const channelCopy = {...channel}
    channelCopy[event.target.name] = event.target.value
    setState({...state, channel: channelCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada
    // Envia os dados para o back-end
    sendData()
  }

  async function sendData() {
    setState({...state, showWaiting: true})
    try {
      
      // Chama a validação da biblioteca Joi
      await Channel.validateAsync(channel)

      await myfetch.post(API_PATH, channel)
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'success',
          show: true,
          message: 'Novo item salvo com sucesso'
        }
      })
    }
    catch(error) {
      console.error(error)
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'error',
          show: true,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    // Se o item foi salvo com sucesso, retorna à página de listagem
    if(notif.severity === 'success') navigate(-1)

    setState({ ...state, notif: { ...notif, show: false } })
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification 
        show={notif.show}
        severity={notif.severity}
        onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>
      
      <PageTitle title="Cadastrar novo método de pagamento" />

      <div>{notif.severity}</div>

      <form onSubmit={handleFormSubmit}>
        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          required
          name="description"  // Nome do campo na tabela
          value={channel.description}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Taxa de operação" 
          variant="filled"
          type="number"
          fullWidth
          required
          name="comission_fee"  // Nome do campo na tabela
          value={channel.comission_fee}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <Fab 
          variant="extended" 
          color="secondary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}*/