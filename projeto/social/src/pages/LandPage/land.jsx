import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importando o framer-motion
import './land.css'

function LandingPage() {
  return (
    <>
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="background-image">
        <motion.h1 
          className="overlay-text" 
          initial={{ opacity: 0, y: -100 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Parental Ease
        </motion.h1>
        <motion.h2 
          className="overlay-subtext" 
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          A maternidade nunca foi tão <br />facil com o apoio de quem <br />ja viveu essa experiencia
        </motion.h2>
      </div>
      <div className="linha"></div>
      <div id="la-mission">
        <motion.div 
          className="missao"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 id='mimi'>NOSSA MISSÃO</h2>
        </motion.div>

        <motion.div 
          className="missao1"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h2>
            Nós sabemos que ser mãe ou pai de <br />primeira viagem não é nada fácil, <br />né?
          </h2>
          <img src="https://artpoin.com/wp-content/uploads/2023/09/artpoin-baby27.png" width="140px" />
        </motion.div>

        <motion.div 
          className="missao2"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <img src="https://images.vexels.com/media/users/3/298618/isolated/preview/ab86fba764c837ac26386a824767fe93-big-yellow-smiling-star.png" width="140px" />
          <h4>
            E quando você tenta equilibrar tudo isso com a <br />
            carreira, a sobrecarga bate forte. Aqui, nossa missão é justamente dar aquele apoio que <br />
            falta, criar um cantinho onde você pode trocar ideias, desabafar e sentir que não está sozinho(a).
          </h4>
        </motion.div>

        <motion.div 
          className="missao3"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h4>
            O nosso espaço foi pensado para facilitar essa <br />jornada, conectando quem entende os desafios de <br />
            ser mãe ou pai com quem está começando agora. <br />Queremos te ajudar a encontrar o equilíbrio entre <br />
            cuidar dos seus filhos e seguir sua vida pessoal <br />e profissional, com mais leveza e menos pressão. <br />
            Afinal, estamos juntos nessa!
          </h4>
          <img src="https://png.pngtree.com/png-vector/20240201/ourmid/pngtree-moon-cartoon-in-flat-style-png-image_11584507.png" width="140px" />
        </motion.div>
        <div className="sky">
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div>
      <div className="cloud"></div> 
      <div className="cloud"></div>
      <div className="cloud"></div>
    </div>

      </div>
    </>
  );
}

export default LandingPage;
