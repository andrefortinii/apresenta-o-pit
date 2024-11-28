import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon, MoonIcon } from '@chakra-ui/icons';

import {
  Box,
  Flex,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  useBreakpointValue
} from "@chakra-ui/react";
import { api } from '../../lib/axios';
import './styles.css'; // Certifique-se de que o arquivo CSS está importado

export function Feed() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure();
  const { isOpen: isBookModalOpen, onOpen: onBookModalOpen, onClose: onBookModalClose } = useDisclosure();
  const { isOpen: isvideoModalOpen, onOpen: onvideoModalOpen, onClose: onvideoModalClose } = useDisclosure();

  useEffect(() => {
    api.get('/api/postagem/listar')
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));

    fetch('/livros.json')
      .then(response => response.json())
      .then(data => setBooks(data.livros))
      .catch(err => console.log(err));
      
      fetch('/videos.json')
  .then((response) => response.json())
  .then((data) => setVideos(data.videos)) // Agora estamos usando setVideos corretamente.
  .catch((error) => console.error('Erro ao buscar dados de vídeos:', error));

  }, []);

  const fetchComments = (postId) => {
    api.get(`/api/postagem/comentarios/${postId}`) // Ajuste a rota se necessário
        .then((response) => setComments([response.data]))
        .catch((err) => console.log(err));
};

useEffect(() => {
  console.log(comments)
}, [comments])

  function handleDeletePost(id) {
    setPosts(posts.filter(post => post.id !== id));
    api.delete(`/api/postagem/excluir/${id}`);
    
  }

  const handleEditClick = (id) => {
    navigate(`/updatePost/${id}`);
  };

  const handleOpenPostModal = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    onPostModalOpen();
  };

  const handleClosePostModal = () => {
    onPostModalClose();
    setSelectedPost(null);
    setComments([]);
    setNewComment("");
    setConfirmationMessage("");
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = (post) => {
    if (newComment.trim()) {
        api.post(`/api/postagem/addcomentario/${post.id}`, {comentario: newComment}) // Passa postId
            .then((response) => {
                setComments([...comments, response.data]);
                setNewComment("");
                setConfirmationMessage("sucesso");
                 setTimeout(() => setConfirmationMessage(""), 3000);
                fetchComments(post.id);
            })
            .catch((err) => console.log(err));
    }
};

  const handleOpenBookModal = (book) => {
    setSelectedBook(book);
    onBookModalOpen();
  };

  const handleCloseBookModal = () => {
    onBookModalClose();
    setSelectedBook(null);
  };
  const handleOpenVideoModal = (book) => {
    setSelectedVideo(book);
    onvideoModalOpen();
  };

  const handleCloseVideoModal = () => {
    onvideoModalClose();
    setSelectedVideo(null);
  };
  //modo escuro daqui para baixo
  const [darkMode, setDarkMode] = useState(() => {
    // Recupera o valor de darkMode do localStorage ou define como false (modo claro) por padrão
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode !== null ? savedMode : false;
  });
  useEffect(() => {
    // Aplica o modo escuro ou claro no body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Salva a preferência do usuário no localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  //modal de nome de usuario

   // Estado para controlar a visibilidade da modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   // Estado para controlar o valor do input
   const [nomeUsuario, setInputValue] = useState('');
 
   useEffect(() => {
     // Verifica se o valor já foi salvo no localStorage
     const savedValue = localStorage.getItem('nomeUsuario');
     if (!savedValue) {
       // Se não houver valor salvo, abre a modal
       setIsModalOpen(true);
     }
   }, []);
 
   const handleInputChange = (event) => {
     setInputValue(event.target.value);
   };
 
   const saveValueAndCloseModal = () => {
     // Salva o valor no localStorage
     localStorage.setItem('nomeUsuario', nomeUsuario);
     // Fecha a modal
     setIsModalOpen(false);
   };
  return (
    <>
     
      <div className='azul'>
        <div id='sloticon'></div>
        <MoonIcon  onClick={toggleDarkMode}>
        { darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </MoonIcon>
        
      </div>

      <h1 className='bv'>Bem-vindo ao ParentalEase!</h1>




      <section className='sec'>
        <div className='dives1'>
        <div id='mini'></div>
          {videos[0] && (
            <div className='video-card' onClick={() => handleOpenVideoModal(videos[0])}>
              <div className='video-cover'>
                <img src={videos[0].imagem} alt={videos[0].url} />
              </div>
              <div className='book-info'>
                <h2>{videos[0].titulo}</h2>
                <h3>{videos[0].canal}</h3>
                
              </div>
            </div>
          )}
        </div>
        <div className='dives1'>
        <div id='mini'></div>
          {videos[1] && (
            <div className='video-card' onClick={() => handleOpenVideoModal(videos[1])}>
              <div className='video-cover'>
                <img src={videos[1].imagem} alt={videos[1].url} />
              </div>
              <div className='book-info'>
                <h2>{videos[1].titulo}</h2>
                <h3>{videos[1].canal}</h3>
              </div>
            </div>
          )}
        </div>
        <div className='dives1'>
        <div id='mini3'></div>
        {videos[2] && (
            <div className='video-card' onClick={() => handleOpenVideoModal(videos[2])}>
              <div className='video-cover'>
                <img src={videos[2].imagem} alt={videos[2].url} />
              </div>
              <div className='book-info'>
                <h2>{videos[2].titulo}</h2>
                <h3>{videos[2].canal}</h3>
              </div>
            </div>
          )}
          
        </div>
        <div className='dives1'>
        <div id='mini4'></div>
        {videos[3] && (
            <div className='video-card' onClick={() => handleOpenVideoModal(videos[3])}>
              <div className='video-cover'>
                <img src={videos[3].imagem} alt={videos[3].url} />
              </div>
              <div className='book-info'>
                <h2>{videos[3].titulo}</h2>
                <h3>{videos[3].canal}</h3>
              </div>
            </div>
          )}
        </div>
      </section>



      <section className='sec'>
        <div className='dives'>
        <div id='mini'></div>
          {books[0] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[0])}>
              <div className='book-cover'>
                <img src={books[0].capa} alt={books[0].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[0].nome}</h2>
                <h3>{books[0].autor}</h3>
                <p>{books[0].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini2'></div>
          {books[1] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[1])}>
              <div className='book-cover'>
                <img src={books[1].capa} alt={books[1].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[1].nome}</h2>
                <h3>{books[1].autor}</h3>
                <p>{books[1].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini3'></div>
          {books[2] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[2])}>
              <div className='book-cover'>
                <img src={books[2].capa} alt={books[2].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[2].nome}</h2>
                <h3>{books[2].autor}</h3>
                <p>{books[2].editora}</p>
              </div>
            </div>
          )}
        </div>
        <div className='dives'>
        <div id='mini4'></div>
          {books[3] && (
            <div className='book-card' onClick={() => handleOpenBookModal(books[3])}>
              <div className='book-cover'>
                <img src={books[3].capa} alt={books[3].nome} />
              </div>
              <div className='book-info'>
                <h2>{books[3].nome}</h2>
                <h3>{books[3].autor}</h3>
                <p>{books[3].editora}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className='posts'>
        <Button id='novopost' onClick={() => navigate('/createPost')}>
          Criar post
        </Button>
        {posts.map((post) => (
          <Box key={post.id} className='post-card'>
             <Box className="pos-nome">{nomeUsuario}</Box>
            <Flex className="post-header">
              <Box className="post-title">{post.titulo}</Box>
              <Box className="post-buttons">
                <EditIcon
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(post.id);
                  }}
                />
                <DeleteIcon
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id);
                  }}
                />
              </Box>
            </Flex>
            <Box className="post-description">{post.descricao}</Box>
            <Button onClick={() => handleOpenPostModal(post)}>Ver Detalhes</Button>
          </Box>
        ))}
      </div>

      {/* Modal para mostrar os detalhes do post */}
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Post</ModalHeader>
          <ModalBody>
            {selectedPost && (
              <>
                <h1><strong>Título:</strong> {selectedPost.titulo}</h1>
                <p><strong>Descrição:</strong> {selectedPost.descricao}</p>
                <p><strong>Conteúdo:</strong> {selectedPost.conteudo}</p>
                <Box className="comment-box" p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
      <h3>Comentários:</h3>
      {/* Lista de Comentários */}
      {comments.length === 0 && <p>Nenhum comentário ainda.</p>}
      {comments.map((comment, index) => (
        <Box key={index} borderWidth={1} borderRadius="md" p={2} mb={2}>
          <p>{comment}</p>
        </Box>
      ))}

      {/* Campo de Texto */}
      <Textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Digite seu comentário"
        rows={4}
        mb={4}
      />
      {/* Botão de Enviar */}
      <Button mt={2} colorScheme="blue" width="150px" onClick={() => handleSendComment(selectedPost)}>
        Enviar Comentário
      </Button>

      {/* Alerta de Confirmação */}
      {confirmationMessage && (
  <Alert
    status="success"
    position="fixed"
    top="20px"
    left="50%"
    transform="translateX(-50%)"
    zIndex="1000"
    borderRadius="md"
    boxShadow="lg"
  >
    <AlertIcon />
    <AlertTitle>{confirmationMessage}</AlertTitle>
  </Alert>
)}
    </Box>

       
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClosePostModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para mostrar os detalhes do livro */}
      <Modal isOpen={isBookModalOpen} onClose={handleCloseBookModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Livro</ModalHeader>
          <ModalBody>
            {selectedBook && (
              <>
                <Box className="book-details">
                  <img src={selectedBook.capa} alt={selectedBook.nome} className="book-cover" />
                  <h2>{selectedBook.nome}</h2>
                  <h3>{selectedBook.autor}</h3>
                  <p>{selectedBook.editora}</p>
                  <p>{selectedBook.sinopse}</p>
                </Box>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseBookModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
       {/* Modal para mostrar os detalhes do video */}
       <Modal isOpen={isvideoModalOpen} onClose={handleCloseVideoModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Video</ModalHeader>
          <ModalBody>
  {selectedVideo && (
    <>
      <Box className="book-details">
        <img id='foto' src={selectedVideo.imagem} alt={selectedVideo.titulo} className="video-cover" />
        <h4 id='nomevd'>{selectedVideo.titulo}</h4>
        <h3 id='canal'>{selectedVideo.canal}</h3>
        
        {/* Adicionando o link com o href da URL da API */}
        <a id='url' href={selectedVideo.url} target="_blank" rel="noopener noreferrer">
          Clique aqui para assistir
        </a>
      </Box>
    </>
  )}
</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseVideoModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
