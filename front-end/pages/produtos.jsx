import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Titulo from '../components/titulo'
import HeaderB from '../components/header_b'
import CardList from '@/components/CardList'
import { useRouter } from 'next/router'

function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [filteredProdutos, setFilteredProdutos] = useState([])
    const router = useRouter()
    const searchTerm = router.query.search || '' // Obtém o searchTerm da query da URL

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/produto')
                setProdutos(response.data)
            } catch (error) {
                console.error('Erro ao carregar produtos:', error)
            }
        }

        fetchProdutos()
    }, [])

    useEffect(() => {
        // Filtra os produtos com base no searchTerm
        const filtered = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProdutos(filtered)
    }, [searchTerm, produtos])

    return (
        <div>
            <HeaderB />
            <Titulo texto="Conheça nossos produtos!" />
            {filteredProdutos.length > 0 ? (
                <CardList produtos={filteredProdutos} />
            ) : (
                <p>{searchTerm ? 'Nenhum produto encontrado.' : 'Carregando produtos...'}</p>
            )}
        </div>
    )
}

export default Produtos
