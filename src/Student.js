import React, { useEffect, useState } from "react";
import { Box, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Fab, TextField, InputAdornment, ThemeProvider, createTheme, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search } from "@mui/icons-material";
import Swal from "sweetalert2";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Student() {
  const apiURL = "http://localhost:8080/students";

  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setStudent({ id: null, name: "", phone: "", email: "", address: "" });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const saveStudent = async () => {
    
    if (!student.name || !student.phone || !student.email || !student.address) {
      Swal.fire({
        title: "Todos os campos são obrigatórios!",
        icon: "warning",
        theme: "dark",
        confirmButtonColor: "#2196f3"
      });
      return;
    }

    setIsSaving(true);

    const response = await fetch(apiURL,
      {
        method: student.id === null ? "POST" : "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(student)
      }
    )

    if(!response.ok) {
      setIsSaving(false);

      Swal.fire({
        title: "Erro ao salvar informações do aluno! Tente novamente!",
        icon: "error",
      });

      return;
    }

    const json = await response.json();

    if(json.id) {
      setIsSaving(false);

      switch(response.status) {
        case 200:
          Swal.fire({
            title: `O(A) aluno(a) ${json.name} foi atualizado com sucesso!`,
            html: `O ID do(a) Aluno(a) é <b>${json.id}</b>`,
            icon: "success",
            theme: "dark",
            confirmButtonColor: "#2196f3"
          });
            
          const updated = students.map((s) => (s.id === student.id ? student : s));
          setStudents(updated);
          break;
        case 201:
          setStudents([
              ...students,
              json
          ]);

          Swal.fire({
              title: `O(A) aluno(a) ${json.name} foi salvo com sucesso!`,
              html: `O ID do Aluno é <b>${json.id}</b>`,
              icon: "success",
              theme: "dark",
              confirmButtonColor: "#2196f3"
          });

        break;
      }
    }

    setStudent({});
    closeModal();
  };

  const deleteStudent = async () => {
    if (rowSelected.length === 0) {
      Swal.fire({
        title: "Selecione pelo menos um aluno para excluir.",
        icon: "info",
        theme: "dark",
        confirmButtonColor: "#2196f3"
      });
      return;
    }

    const deleteStudent = students.find((s) => s.id === rowSelected[0])

    if(deleteStudent === undefined) {
      Swal.fire({
        title: "Selecione um registro válido (com id) para excluir.",
        icon: "info",
        theme: "dark",
        confirmButtonColor: "#2196f3"
      });
      return;
    }

    Swal.fire({
      title: `Você deseja realmente excluir ${deleteStudent.name}?`,
      icon: "question",
      showConfirmButton: true,
      showDenyButton: true,
      theme: "dark",
      confirmButtonColor: "#2196f3",
      confirmButtonText: "Sim",
      denyButtonText: "Não"
    }).then((result) => {
      if(result.isConfirmed) {
        fetch(apiURL + `/${deleteStudent.id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        })
        .then((response) => {
          if(response.ok) {
            const remaining = students.filter((s) => !rowSelected.includes(s.id));
            setStudents(remaining);
            setRowSelected([]);
          }
        })
        .catch((err) => {
          console.error(err)
        })
      }
      
    });

    
  };

  const handleEdit = () => {
    if (rowSelected.length !== 1) {
      Swal.fire({
        title: "Selecione pelo menos um aluno para editar.",
        icon: "info",
        theme: "dark",
        confirmButtonColor: "#2196f3"
      });
      return;
    }

    const studentToEdit = students.find((s) => s.id === rowSelected[0]);
    setStudent(studentToEdit);
    openModal();
  };

  const columns = [
    { field: "id", headerName: "#", sortable: false, },
    { field: "name", headerName: "Nome", flex: 0.5 },
    { field: "phone", headerName: "Telefone" },
    { field: "email", headerName: "Email" },
    { field: "address", headerName: "Endereço", flex: 1 },
  ];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);

    const fetchStudents = async () => {
      const response = await fetch(apiURL, {
        headers: {
          "Accept": "application/json",
        }
      });

      const json = await response.json();

      setStudents(json);
      setLoading(false);
    }

    fetchStudents();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Box
          sx={{
            py: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>

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
            <Box
              sx={{
                display: 'flex',
                gap: 2
              }}
            >
              <Button
                variant="contained"
                color="error"
                disabled={rowSelected.length === 0}
                onClick={deleteStudent}
              >
                Excluir
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={rowSelected.length === 0}
                onClick={handleEdit}
              >
                Editar
              </Button>
            </Box>
          </Box>

          <Paper sx={{ minHeight: 500, height: "70vh", width: "100%" }}>
            <DataGrid
              rows={filteredStudents}
              columns={columns}
              getRowId={(row) => row.id}
              onRowSelectionModelChange={(id) => setRowSelected(id)}
              sx={{ border: 0 }}
              loading={isLoading}
            />
          </Paper>

          
        </Box>
        <Fab
          color="primary"
          aria-label="add"
          onClick={openModal}
          sx={{ alignSelf: "flex-end", position: "fixed", bottom: 0, right: 0 }}
        >
          <Add />
        </Fab>
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
              type="number"
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
            <Button disabled={isSaving} variant="contained" color="error" onClick={closeModal}>Cancelar</Button>
            <Button disabled={isSaving} variant="contained" color="success" onClick={saveStudent}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
