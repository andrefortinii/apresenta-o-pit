
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from "../../components/Form";
import { api } from "../../lib/axios";

export function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);

  // Recuperar os dados do post ao carregar o componente
  useEffect(() => {
    api.get(`/api/postagem/listar/${id}`)
      .then(response => {
        setPostData(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // Função para editar o post
  function handleUpdatePost(data) {
    api.put(`/api/postagem/editar/${id}`, data)
      .then(() => navigate("/Feed"))
      .catch(err => console.log(err));
  }

  if (!postData) {
    return <div>Carregando...</div>; // Exibe uma mensagem enquanto os dados estão sendo carregados
  }

  return (
    <div>
      <Form
        title={'Editar publicação'}
        textButton={'Editar'}
        onAction={handleUpdatePost}
        initialData={postData} // Passa os dados do post para o formulário
      />
    </div>
  );
}

