import styles from './HexGallery.module.css';
import staticData from './data.json';

interface HexItem {
    id: number;
    title: string;
    btnTitle: string;
}
export const HexGallery: React.FC = () => {
    return (
        <section className={styles.hexagongallery}>
            {staticData.map((item: HexItem) => (
                <div className={styles.hex} key={item.id}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <button className={styles.hexbutton}>{item.btnTitle}</button>
                    </div>
                </div>
            ))}
        </section>
    );
};
