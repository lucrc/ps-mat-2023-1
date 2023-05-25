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
import User from "../../models/User";
import getValidationMessages from "../../utils/getValidationMessages";




export default function UserForm(){
    const API_PATH = '/users'
    const params = useParams()

    const navigate = useNavigate()

    const [state, setState] = React.useState({
        user: {
          name: '',
          email: '',
          verified_email: false,
          is_admin: false,
          phone: '',
          password: ''
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
        user,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event) {
        const userCopy = {...user}
        userCopy[event.target.name] = event.target.value
        setState({...state, user: userCopy})
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
          user: result,
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
           
            await User.validateAsync(user, {abortEarly: false})
            
            //Registro já existe: chama PUT para atualizar
            if(params.id) await myfetch.put(`${API_PATH}/${params.id}`, user)
            // Registro não existe: chama POST para criar
            else await myfetch.post(API_PATH, user)
            //Dar Feedback positivo e voltar para a lisuserem            
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
        // Se o item foi salvo com sucesso, retorna à página de lisuserem
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

            <PageTitle title={params.id? "Editar usuário":"Cadastrar nova usuário"}/>
            

            <form onSubmit={handleFormSubmit}>
                <TextField  
                    label="Nome" 
                    variant="filled" 
                    name="name" //Nome do campo da tabela
                    fullWidth
                    required
                    value={user.name} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.name}
                    helperText={errors?.name}
                    

                />
                <TextField  
                    label="E-mail" 
                    fullWidth
                    required
                    variant="filled" 
                    name="email" //Nome do campo da tabela
                    value={user.email} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.email}
                    helperText={errors?.email}

                />
                <TextField  
                    label="E-mail verificado" 
                    fullWidth
                    required
                    variant="filled" 
                    name="verified_email" //Nome do campo da tabela
                    value={user.verified_email} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.verified_email}
                    helperText={errors?.verified_email}

                />
                <TextField  
                    label="Usuário administrador" 
                    fullWidth
                    required
                    variant="filled" 
                    name="is_admin" //Nome do campo da tabela
                    value={user.is_admin} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.is_admin}
                    helperText={errors?.is_admin}

                />
                <TextField  
                    label="Telefone" 
                    fullWidth
                    required
                    variant="filled" 
                    name="phone" //Nome do campo da tabela
                    value={user.phone} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.phone}
                    helperText={errors?.phone}

                />
                <TextField  
                    label="Password" 
                    fullWidth
                    required
                    variant="filled" 
                    name="password" //Nome do campo da tabela
                    value={user.password} // nome do campo da tabela
                    onChange={handleFormFieldChange}
                    error={errors?.password}
                    helperText={errors?.password}

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