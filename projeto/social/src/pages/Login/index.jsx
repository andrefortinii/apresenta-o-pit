import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";  // Importando framer-motion

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        senha,
      });

      const { token, role } = response.data;
      
      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', token);

      // Redirecionar o usuário dependendo do papel
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/Feed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Erro ao logar');
    }
  };

  return (
    <C.Container>
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Animação de entrada para o título
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <C.Label>FAÇA SEU LOGIN</C.Label>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Animação de entrada para os campos de input
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} // Animação de entrada para o botão
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button Text="Entrar" onClick={handleLogin} />
          </motion.div>
          
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/cadastro">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </motion.div>
    </C.Container>
  );
};

export default Login;
