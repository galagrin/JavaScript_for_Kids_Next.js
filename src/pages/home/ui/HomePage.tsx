import Image from 'next/image';
import { HexGallery } from 'widgets/HexGallery/index';

import styles from './HomePage.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <Image src="/images/mainPandaImg.png" alt="Картинка панды" width={300} height={300} />
            <HexGallery />
        </div>
    );
}
