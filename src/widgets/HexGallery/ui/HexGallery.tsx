import staticData from '../model/data.json';
import { HexItem } from '../model/types';

import styles from './HexGallery.module.scss';

export const HexGallery = () => {
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
