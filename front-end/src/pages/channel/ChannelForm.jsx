import React from "react";
import PageTitle from "../../components/ui/PageTitle";
import  TextField  from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from "../../utils/myfecth";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from "../../components/ui/Notification";
import { useNavigate, useParams } from "react-router-dom";
import Channel from "../../models/Channel";
import getValidationMessages from "../../utils/getValidationMessages";




export default function ChannelForm(){
    const API_PATH = '/channels'
    const params = useParams()

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

    // Este useEffect será exucatado apenas durante o carregamento
    //inicial da página
    React.useEffect(()=>{
      // se houver parâmetro id na rota, devemos carregar um registro
      // existente para edição
      if(params.id) fetchData()
    }, [])

    async function fetchData(){
      setState({...state,
        showWaiting:true, errors:{}
      })
      try {
        const result = await myfetch.get(`${API_PATH}/${params.id}`)
        setState({
          ...state,
          channel: result,
          showWaiting: false
        })
      }
      catch (error){
        setState({
          ...state,
          showWaiting: false,
          errors: errorMessages,
          notif:{
            severity: 'error',
            show: true,
            message: 'ERRO ' + error.message
          }
        })
      }
    }
    async function sendData() {
        console.log('sendData')
        setState({...state, showWaiting: true, errors:{}})
        try{
            //Chama a validação da biblioteca Joi
           
            await Channel.validateAsync(channel, {abortEarly: false})
            
            //Registro já existe: chama PUT para atualizar
            if(params.id) await myfetch.put(`${API_PATH}/${params.id}`, channel)
            // Registro não existe: chama POST para criar
            else await myfetch.post(API_PATH, channel)
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

            <PageTitle title={params.id? "Editar canal de vendas":"Cadastrar novo canal de vendas"}/>
            

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