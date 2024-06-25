// import styles from '../styles/header_b.module.css'
// import Link from "next/link"

// export default function header_b(){
//     return (
//         <nav className="navbar navbar-expand-lg bg-dark">
//         <div className="container">
//           <h1 className="navbar-brand" >
//             <img src="logo/logo4.png"/>
//           </h1 >
    
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
    
//           <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//             <ul className="navbar-nav fs-5">
//               <li className="nav-item">
//                 <Link className="nav-link text-light text-uppercase" id='menu' href="/">Home</Link >
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-light text-uppercase" id='menu' href="/produtos">Produtos</Link >
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-light text-uppercase" id='menu' href="/contato">Contato</Link >
//               </li>
//             </ul>
//             <button type="button" className="btn text-white fs-2 bi bi-search" id='menu' data-bs-toggle="modal"
//               data-bs-target="#exampleModal"></button>
//             <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//               <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h1 className="modal-title fs-5" id="exampleModalLabel">Procure por Novas Vagas</h1>
//                     <button type="button" classname="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                   </div>
//                   <div className="modal-body">
//                     <form className="d-flex" role="search" action="/busca" method="post">
//                       <input className="form-control me-2" id='form' type="search" placeholder="Lápis, Caneta..."
//                         aria-label="Search" name="buscar" />
//                       <div className="input-group">
//                         <span className="input-group-btn">
//                           <button id='search' classname="btn" type="submit"><i
//                               className="bi bi-search fs-7 fw-bold text-white "></i></button>
//                         </span>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
// }

// import styles from '../styles/header_b.module.css'
// import Link from "next/link"

// export default function header_b(){
//     return (
//         <nav classname="navbar navbar-expand-lg bg-dark">
//         <div classname="container">
//           <h1 classname="navbar-brand" >
//             <img src="logo/logo4.png"/>
//           </h1 >
    
//           <button classname="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span classname="navbar-toggler-icon"></span>
//           </button>
    
//           <div classname="collapse navbar-collapse justify-content-end" id="navbarNav">
//             <ul classname="navbar-nav fs-5">
//               <li classname="nav-item">
//                 <Link classname="nav-link text-light text-uppercase" id='menu' href="/">Home</Link >
//               </li>
//               <li classname="nav-item">
//                 <Link classname="nav-link text-light text-uppercase" id='menu' href="/produtos">Produtos</Link >
//               </li>
//               <li classname="nav-item">
//                 <Link classname="nav-link text-light text-uppercase" id='menu' href="/contato">Contato</Link >
//               </li>
//             </ul>
//             <button type="button" classname="btn text-white fs-2 bi bi-search" id='menu' data-bs-toggle="modal"
//               data-bs-target="#exampleModal"></button>
//             <div classname="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//               <div classname="modal-dialog modal-dialog-centered">
//                 <div classname="modal-content">
//                   <div classname="modal-header">
//                     <h1 classname="modal-title fs-5" id="exampleModalLabel">Procure por Novas Vagas</h1>
//                     <button type="button" classname="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                   </div>
//                   <div classname="modal-body">
//                     <form classname="d-flex" role="search" action="/busca" method="post">
//                       <input classname="form-control me-2" id='form' type="search" placeholder="Lápis, Caneta..."
//                         aria-label="Search" name="buscar" />
//                       <div classname="input-group">
//                         <span classname="input-group-btn">
//                           <button id='search' classname="btn" type="submit"><i
//                               classname="bi bi-search fs-7 fw-bold text-white "></i></button>
//                         </span>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
// }


import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/header_b.module.css'
import { useRouter } from 'next/router'

export default function HeaderB() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const isProdutosPage = router.pathname === '/produtos' // Verifica se está na página de produtos

    // Função para lidar com a submissão do formulário de busca
    const handleSearch = (e) => {
        e.preventDefault() // Evita o comportamento padrão do formulário
        // Navega para a página de produtos com o termo de busca na query da URL
        router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <img src="logo/logo4.png" className={styles.img} />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light text-uppercase" aria-current="page" href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-light text-uppercase"
                                aria-current="page"
                                href="/produtos"
                            >
                                Produtos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link text-light text-uppercase"
                                aria-current="page"
                                href="/contato"
                            >
                                Contato
                            </Link>
                        </li>
                    </ul>

                    {/* Renderiza o formulário de busca apenas na página de produtos */}
                    {isProdutosPage && (
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar produtos..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="submit">
                                Buscar
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}
