import { useEffect } from 'react';

import { useArraysStore } from '@/entities/arrays/model/store';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

export default function ArraysPage() {
    const { arraysList, fetchAllArraysList, loadingAllArrays, errorAllArrays } = useArraysStore();

    useEffect(() => {
        if (arraysList.length === 0) {
            fetchAllArraysList();
        }
    }, [arraysList, fetchAllArraysList]);

    return (
        <CardViewer
            items={arraysList.map((item) => ({ ...item, id: String(item.id) }))}
            isLoading={loadingAllArrays}
            error={errorAllArrays}
            progressKey="arrays"
        />
    );
}
