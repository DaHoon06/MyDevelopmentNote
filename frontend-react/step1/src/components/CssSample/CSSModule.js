import styles from '../../css/CSSMODULE.module.scss';

const CSSModule = () => {
    return(
        <div className={`${styles.wrapper} ${styles.inverted}`}>
            안녕하세요, 저는 <span className='something'>CSS Module</span>
        </div>
    )
}

export default CSSModule;