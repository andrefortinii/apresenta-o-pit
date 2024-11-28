import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';
import './styles.css';

export function Form({ title, textButton }) {
  const { id } = useParams(); // Obtém o ID da URL (se estiver presente)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ titulo: '', descricao: '', conteudo: '', imagem: '' });

  // Carrega os dados do post para edição, caso o ID exista
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/api/postagem/${id}`);
          setFormData(response.data); // Preenche os campos com os dados do post
        } catch (error) {
          console.error('Erro ao carregar os dados do post:', error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Atualiza o post existente
        await api.put(`/api/postagem/editar/${id}`, formData);
      } else {
        // Cria um novo post
        await api.post('/api/postagem/adicionar', formData);
      }
      navigate('/feed'); // Redireciona para o feed após salvar
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handlePost} className="form-container">
      <h2 className="form-title">{title}</h2>
      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input
          placeholder="Um título criativo para sua postagem"
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <input
          placeholder="Descreva seu post em poucas palavras"
          type="text"
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="conteudo">Conteúdo:</label>
        <textarea
          placeholder="Informe detalhadamente o que você está pensando..."
          id="conteudo"
          name="conteudo"
          value={formData.conteudo}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="form-button">
        {id ? '' : 'Ok!'} {textButton}
      </button>
    </form>
  );
}
