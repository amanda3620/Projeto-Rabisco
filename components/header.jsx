import styles from '../styles/header.module.css'
import Link from "next/link"

export default function Header(props){
    let tamanho
    if(props.size=="big"){
        tamanho = "22pt"
    }else{
        tamanho = "16pt"
    }
    console.log(props)
    return(
        <header className={styles.header} style={{
            backgroundColor:props.bgcolor,
            color:props.cor
        }}>
            <aside className={styles.aside}>
            <img src='logo/logo3.png'/>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.a}>
                        Home
                    </Link>
                    <Link href="/produtos" className={styles.a}>
                        Produtos
                    </Link>
                    <Link href="/contato" className={styles.a}>
                        Contato
                    </Link>
                </nav>
            </aside>
            <h1 style={{
                fontSize:tamanho
            }}>{props.title}</h1>
        </header>
    )
}