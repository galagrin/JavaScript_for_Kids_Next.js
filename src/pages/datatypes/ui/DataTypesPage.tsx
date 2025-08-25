'use client';

import { useEffect } from 'react';

import { useDataTypesStore } from '@/entities/datatypes';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

export const DataTypesPage = () => {
    const { dataTypesList, fetchAllDataTypesList, loadingAllDataTypes, errorAllDataTypes } = useDataTypesStore();
    
    useEffect(() => {
        if (dataTypesList.length === 0) {
            fetchAllDataTypesList();
        }
    }, [dataTypesList, fetchAllDataTypesList]);

    return <CardViewer items={dataTypesList.map(item => ({ ...item, id: String(item.id) }))} isLoading={loadingAllDataTypes} error={errorAllDataTypes} progressKey="datatypes" />;
}; 