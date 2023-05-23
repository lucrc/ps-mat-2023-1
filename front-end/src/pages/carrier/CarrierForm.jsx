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
import Carrier from "../../models/Carrier";
import getValidationMessages from "../../utils/getValidationMessages";




export default function CarrierForm(){
    const API_PATH = '/payment_methods'

    const navigate = useNavigate()
    const params = useParams()

    const [state, setState] = React.useState({
        carrier: {
          description: '',
          operator_fee: ''
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
        carrier,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event) {
        const carrierCopy = {...carrier}
        carrierCopy[event.target.name] = event.target.value
        setState({...state, carrier: carrierCopy})
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
          carrier: result,
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
            message: 'EROO ' + error.message
          }
        })
      }
    }

    async function sendData() {
        console.log('sendData')
        setState({...state, showWaiting: true, errors:{}})
        try{
            //Chama a validação da biblioteca Joi
           
            await Carrier.validateAsync(carrier, {abortEarly: false})
            //Registro já existe: chama PUT para atualizar
            if(params.id) await myfetch.put(`${API_PATH}/${params.id}`, carrier)
            // Registro não existe: chama POST para criar
            else await myfetch.post(API_PATH, carrier)
            
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

            <PageTitle 
            title={ params.id? "Editar método de pagamento" : "Cadastrar novo método de pagamento" }/>
            

            <form onSubmit={handleFormSubmit}>
                <TextField  
                    label="Descrição" 
                    variant="filled" 
                    name="description" //Nome do campo da tabela
                    fullWidth
                    required
                    value={carrier.description} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.description}
                    helperText={errors?.description}
                    

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

