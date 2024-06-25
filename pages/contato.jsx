import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Titulo from '../components/titulo'
import Headerb from '../components/header_b'
import CardListContato from '@/components/CardListContato'

// export default function contato(){
//     return(
//     <>
//         <Headerb /*title="CONTATO" bgcolor="gray" size="big"*//>
//         <Titulo texto='Entre em contato com a nossa página'/>
        
//     </>
//     )

// }

function contatos() {
    const [contato, setContatos] = useState({})
  
    useEffect(() => {
      axios.get('https://reqres.in/api/users?page=2&per_page=4')
        .then(response => setContatos(response.data))
        .catch(error => console.error('Erro ao carregar os contatos:', error))
    }, [])
  
  
  
  
    return (
      <div>
          <Headerb />
          <Titulo texto="Entre em contato com a nossa página!" />
        {contato.data ? (
          <CardListContato contatos={contato.data} />
        ) : (
          <p>Carregando os contatos...</p>
        )}
      </div>
      
  
      
    ) 
  }
  
  export default contatos
  



  
  