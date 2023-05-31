import styles from '@/styles/loading.module.css'

export default function Spinner(){
    return (
        <div className={styles.spinner}>
            <div className={styles.ldsGrid}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h1>Carregando aplicação</h1>
        </div>
    );
}
