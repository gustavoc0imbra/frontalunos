import { AccountCircle, Add, Email, LocationOn, Phone, Search } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Student() {
    const apiURL = "http://localhost:8080/students";
    
    const [open, setOpen] = useState(true);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [saving, setSaving] = useState(false);

    

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleStudentChange = (e) => {
        let updatedVl = {}
    };

    const submitStudent = async () => {
        setSaving(true);
        if(student.name != "" && student.phone != "" && student.email != "" && student.address != "") {
            const response = await fetch(
                apiURL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(student)
                }
            );

            if(response.status == 200) {
                const json = await response.json();

                if(json.id) {
                    setStudents([
                        ...students,
                        json
                    ])

                    setTimeout(() => {
                        setSaving(false);
                    }, 1000);

                    setStudent({});

                    handleCloseModal();

                    Swal.fire({
                        title: `O Aluno ${json.name} foi salvo com sucesso!`,
                        html: `O ID do Aluno é <b>${json.id}</b>`,
                        icon: "success",
                    });
                }

                
            }
        }

       
        
        
    }

    return (
        <>
            <Container>
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        variant="standard"
                        label="Pesquisar"
                        type="search"
                        placeholder="Pesquise pelo nome"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment>
                                        <Search />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />

                        
                    <Fab 
                        color="primary"
                        aria-label="add" onClick={handleOpenModal}
                        sx={{
                            alignSelf: 'flex-end',
                        }}
                    >
                        <Add />
                    </Fab>
                </Box>
                
            </Container>
            <Dialog
                open={open}
                onClose={handleCloseModal}
                fullWidth
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">Cadastrar Aluno</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            label="Nome"
                            type="text"
                            placeholder="Informe o nome"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            value={student.name}
                            onChange={(e) => {
                                setStudent({
                                    ...student,
                                    name: e.target.value
                                })
                            }}
                        />
                        <TextField
                            required
                            margin="dense"
                            label="Telefone"
                            type="text"
                            placeholder="Informe o telefone"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment>
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            value={student.phone}
                            onChange={(e) => {
                                setStudent({
                                    ...student,
                                    phone: e.target.value
                                })
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="E-mail"
                            type="email"
                            placeholder="Informe o e-mail"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment>
                                            <Email />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            value={student.email}
                            onChange={(e) => {
                                setStudent({
                                    ...student,
                                    email: e.target.value
                                })
                            }}
                        />

                        <TextField
                            required
                            margin="dense"
                            label="Endereço"
                            type="text"
                            placeholder="Informe o endereço"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment>
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            value={student.address}
                            onChange={(e) => {
                                setStudent({
                                    ...student,
                                    address: e.target.value
                                })
                            }}
                        />
                        
                        {/* {student.id} || {student.name} || {student.email} || {student.phone} || {student.address} */}

                    </Stack>
                    
                </DialogContent>
                <DialogActions>
                    <Button disabled={saving} variant="contained" color="success" onClick={submitStudent}>Salvar</Button>
                    <Button disabled={saving} variant="contained" color="error" onClick={handleCloseModal}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}