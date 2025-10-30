import { useEffect } from 'react';

import { useObjectsStore } from '@/entities/objects';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

import styles from './ObjectsPage.module.scss';

const ObjectsPage = () => {
    const { objectsList, fetchAllObjectsList, loadingAllObjects, errorAllObjects } = useObjectsStore();

    useEffect(() => {
        if (objectsList.length === 0) {
            fetchAllObjectsList();
        }
    }, [objectsList, fetchAllObjectsList]);

    return (
        <CardViewer
            items={objectsList.map((item) => ({ ...item, id: String(item.id) }))}
            isLoading={loadingAllObjects}
            error={errorAllObjects}
            progressKey="objects"
        />
    );
};
export default ObjectsPage;
