import { AccountCircle } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function Student() {
    const [open, setOpen] = useState(true);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseModal}

            >
                <DialogTitle>Cadastrar Aluno</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Nome"
                        type="text"
                        placeholder="Informe o nome do aluno"
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment>
                                    <AccountCircle />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error">Cancelar</Button>
                    <Button color="success">Salvar</Button>
                </DialogActions>
            </Dialog>
            <Button color="success" onClick={handleOpenModal}>Teste</Button>
        </>

    )
}