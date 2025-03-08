import Image from 'next/image';
import { HexGallery } from 'widgets/HexGallery/index';

export default function HomePage() {
    return (
        <>
            <Image src="/images/mainPandaImg.png" alt="Картинка панды" width={300} height={300} />;
            <HexGallery />
        </>
    );
}
