import styles from "./Buttonlink.module.css";
function Buttonmenu(props){

    return <>
    
    <button className={styles.button}>
        {props.nombre}
    </button>
    
    </>
}

export default Buttonmenu;