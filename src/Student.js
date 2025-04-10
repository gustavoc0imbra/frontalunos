import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  TextField,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search } from "@mui/icons-material";
import Swal from "sweetalert2";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Student() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setStudent({ id: null, name: "", phone: "", email: "", address: "" });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!student.name || !student.phone || !student.email || !student.address) {
      Swal.fire("Todos os campos são obrigatórios!", "", "warning");
      return;
    }

    if (student.id !== null) {
      // Editar
      const updated = students.map((s) => (s.id === student.id ? student : s));
      setStudents(updated);
    } else {
      // Novo cadastro
      const newStudent = { ...student, id: Date.now() };
      setStudents((prev) => [...prev, newStudent]);
    }

    closeModal();
  };

  const handleDelete = () => {
    if (selected.length === 0) {
      Swal.fire("Selecione pelo menos um aluno para excluir.", "", "info");
      return;
    }

    const remaining = students.filter((s) => !selected.includes(s.id));
    setStudents(remaining);
    setSelected([]);
  };

  const handleEdit = () => {
    if (selected.length !== 1) {
      Swal.fire("Selecione apenas um aluno para editar.", "", "warning");
      return;
    }

    const studentToEdit = students.find((s) => s.id === selected[0]);
    setStudent(studentToEdit);
    openModal();
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Nome", width: 150 },
    { field: "phone", headerName: "Telefone", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Endereço", width: 200 },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {/* Botão de adicionar */}
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>

        {/* Área da pesquisa + botões */}
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <TextField
              variant="outlined"
              label="Pesquisar"
              type="search"
              placeholder="Pesquise pelo nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 300,
                backgroundColor: "#1e1e1e",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />
            <Box>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 1 }}
                onClick={handleDelete}
              >
                Excluir
              </Button>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Editar
              </Button>
            </Box>
          </Box>

          {/* Tabela com DataGrid */}
          <Paper sx={{ minHeight: 500, height: "70vh", width: "100%" }}>
            <DataGrid
              rows={filteredStudents}
              columns={columns}
              getRowId={(row) => row.id}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(ids) => setSelected(ids)}
              sx={{ border: 0 }}
            />
          </Paper>

          <Fab
            color="primary"
            aria-label="add"
            onClick={openModal}
            sx={{ alignSelf: "flex-end" }}
          >
            <Add />
          </Fab>
        </Box>

        {/* Modal de cadastro */}
        <Dialog open={open} onClose={closeModal}>
          <DialogTitle>
            {student.id ? "Editar Aluno" : "Cadastrar Aluno"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              name="name"
              fullWidth
              value={student.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Telefone"
              name="phone"
              fullWidth
              value={student.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={student.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Endereço"
              name="address"
              fullWidth
              value={student.address}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
