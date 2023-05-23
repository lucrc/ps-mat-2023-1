import React from "react"
import myfetch from "../../utils/myfecth"
import PageTitle from "../../components/ui/PageTitle"
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton  from "@mui/material/IconButton";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Notification from "../../components/ui/Notification";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle'



export default function TagList(){

    const API_PATH = '/tags'

    const [state, setState] = React.useState({
        tags: [],
        showWaiting: false,
        showDialog: false,
        deleteId: null,
        notif: {
            show: false,
            message: '',
            severity: 'success' // ou error
        }
    })
    const {
        tags,
        showWaiting,
        showDialog,
        deleteId,
        notif
    } = state
    
    async function fetchData(){
        setState({...state, showWaiting:true})
        try{
            const result = await myfetch.get(API_PATH)            
            setState({
                ... state, 
                tags: result, 
                showWaiting: false, 
                showDialog: false
            })           
        }
        catch(error){
            console.log(error)
            setState({
                ...state, 
                showWaitting: false,
                showDialog: false
            })
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Cód.', width: 90 },
        {
          field: 'description',
          headerName: 'Descrição',
          width: 150          
        },
        {
          field: 'color',
          headerName: 'Cor',
          width: 150          
        },
        {
            field: 'type',
            headerName: 'Tipo',
            width: 150          
        },
        {
            field: 'edit',
            headerName: 'Editar',
            headerAlign: 'center',
            width: 90,
            renderCell: params => (
                <Link to={'./' + params.id}>
                <IconButton aria-label="Editar">
                    <EditIcon />
                </IconButton>
                </Link>
            )
        },
        {
            field: 'delete',
            headerName: 'Excluir',
            headerAlign: 'center',
            width: 90,
            renderCell: params => (
                <IconButton 
                    aria-label="excluir"
                    onClick={() => setState({
                        ...state,
                        deleteId: params.id, //guarda o id do item a ser excluído
                        showDialog: true     // mostra o diálogo de confirmação
                    })}
                    >
                    <DeleteForeverIcon color="error"
                    
                    />
                </IconButton>
            )
        }               
      ];
            

      async function handleDialogClose(answer){
        
        if(answer){
            //fecha o diálogo de confirmação e exibe o backdrop
            setState({...state, showWaiting: true, showDialog: false})
            try{
                await myfetch.delete(`${API_PATH}/${deleteId}`)
                // Dar feedback positivo para o usuário e fechar o diálogo de confirmação
                setState({
                    ...state,
                    showWaiting: false,     //esconde o backdrop
                    showDialog: false,      //esconde o dialogo de confirmação
                    notif:{                 //exibe o snacbar
                        show: true,
                        message: 'Item excluído com sucesso',
                        severity: 'sucess'
                    }
                })
                //Recarrega os dados da listagem
                fetchData()
            }
            catch{
                console.error(error)
                // Dar feedback negativo e fechar o diálogo de confirmação
                setState({
                    ...state,
                    showWaiting: false,
                    showDialog: false,      //esconde o dialogo de confirmação
                    notif: {
                        show: true,
                        message: 'Erro: ' + error.messgage,
                        severity: 'error'
                    }
                })
            }
        }
        else{
            //Fecha o diálogo de confirmação
            setState({...state, showDialog:false})
        }
      }
        function handleNotifClose (event, reason) {
            if (reason === 'clickaway') {
            return;
            }
            setState({
                ...state,
                notif: {show: false}
            })
        }
    return(
        <>
           <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showWaiting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <ConfirmDialog 
                title="Confirmar operação" 
                open={showDialog}
                onClose={handleDialogClose}>
                Deseja realmente excluir este item?
            </ConfirmDialog>

            <Notification 
                show={notif.show} 
                onClose={handleNotifClose}
                severity={notif.severity}
                >
                    {notif.message}    
            </Notification>   

            <PageTitle title="Listagem de tags" />
            <Box sx={{
                display: "flex",
                justifyContent: "right",
                marginBottom: "25px"
            }}>
                <Link to="new">
                    <Button 
                        variant="contained" 
                        size="large" 
                        color="secondary"
                        startIcon={<AddCircleIcon/>}
                        >
                        Cadastrar novo
                    </Button>
                </Link>
            </Box>
            <Paper elevation={4} sx={{ height: 400, width: '100%' }}>

            <DataGrid
                rows={tags}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}                
                disableRowSelectionOnClick
            />
            </Paper>
        </>
    )
}